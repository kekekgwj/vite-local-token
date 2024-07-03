# vite-local-token

> Vite plugin for local development. Set the token as local Cookie returned from SSO login.


## Motivation
- Support local developing if use SSO Authorization
- previous way:
  - SSO login 
  - return to the target page
  - get the authorization token in the url query
  - copy the token and paste it into Cookie


## Usage

```sh
pnpm i -D vite-plugin-local-token
```

```ts
// vite.config.ts
import localToken from 'vite-plugin-local-token'

// @see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...other plugins
    localToken(/* options */),
  ],
})
```

## Options

```ts
interface IOption {
  tokenKeyName: string;
  tokenQueryName: string;
  cookieControl?: string[];
}

// example
export default defineConfig({
  plugins: [
    react(),
    //@ts-ignore
    viteLocalTokenPlugin({
      // set cookie attributes
      cookieControl: ["HttpOnly", "Secure", "..."],
      // cookie Name
      tokenKeyName: "X-Isyscore-Permission-Sid",
      // name of the token in queries, eg: http://.....?token=xxxxx
      tokenQueryName: "token",
    }),
  ]
  }
)
```


