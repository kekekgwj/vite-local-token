import { ViteDevServer } from "vite";
import { PluginOption } from "vite";
interface IOption {
  tokenKeyName: string;
  tokenQueryName: string;
  cookieControl?: string[];
}

export default function viteLocalTokenPlugin(options: IOption): PluginOption {
  const { tokenKeyName, tokenQueryName, cookieControl } = options;
  return {
    name: "localToken",
    enforce: "pre",
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.originalUrl) {
            next();
            return;
          }
          const [_host, params = ""] = req.originalUrl.split("?");

          const queries = decodeURIComponent(params)
            .split("&")
            .reduce(
              (acc, cur) => {
                const [key, value] = cur.split("=");
                acc[key] = value;
                return acc;
              },
              {} as Record<string, any>,
            );
          const token = queries && queries[tokenQueryName];
          if (token) {
            res.setHeader("Set-Cookie", `${tokenKeyName}=${token}; HttpOnly ${cookieControl ? cookieControl.join(" ") : ""}`);
          }

          next();
        });
      };
    },
    // transformIndexHtml(this, html, ctx) {
    //   return html;
    // },
  };
}
