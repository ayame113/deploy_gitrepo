# deploy_gitrepo

![stars](https://img.shields.io/github/stars/ayame113/deploy_gitrepo?style=social)

A very simple server that hosts a github repository as-is with
[deno deploy](https://deno.com/deploy).

- Specify the version in the URL. (ex:
  `https://<your domain>/<version>/<path to file>`)
- You can retrieve data from the github API using personal access token
  authentication.
- You can also convert the content with the `converters` option. for example:
  - TypeScript -> JavaScript
  - markdown -> HTML

```ts
import {
  mdToHTML,
  serve,
  tsToJs,
} from "https://deploy-gitrepo.deno.dev/v0.0.1/md_to_html.ts";

const converters = [{
  // When `match` returns true, the` convert` function is called. (The first matching converter will be used.)
  match: (request: Request) => new URL(request.url).pathname.endsWith(".md"),
  convert: mdToHTML,
}, {
  match: (request: Request) =>
    !request.headers.get("user-agent")?.includes("Deno"),
  convert: tsToJs,
}, {
  match: () => true,
  convert: ({ content }: { content: string }) => ({
    content,
    headers: { "Access-Control-Allow-Origin": "*" },
  }),
}];

serve({
  owner: "your_account_name",
  repo: "your_repository_name",
  converters, // optional: Converting file content
  tokenKey: "tokenKey", // optional: The key of the environment variable that stores the personal access token of github
});
```

# Link

[github](https://github.com/ayame113/deploy_gitrepo)
