# deploy_gitrepo

Provide your github repository as is from deno deploy.

You can also convert the content with the `converters` option. for example:

- TypeScript -> JavaScript
- markdown -> HTML

```ts
import { serve } from "https://deploy-gitrepo.deno.dev/v0.0.1/serve.ts";
import { tsToJs } from "https://deploy-gitrepo.deno.dev/v0.0.1/ts_to_js.ts";
import { mdToHTML } from "https://deploy-gitrepo.deno.dev/v0.0.1/md_to_html.ts";

const converters = [{
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
  owner: "ayame113",
  repo: "deploy_gitrepo",
  converters,
});
```
