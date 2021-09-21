# deploy_gitrepo

[![star this repo](https://img.shields.io/github/stars/ayame113/deploy_gitrepo?style=social)](https://github.com/ayame113/deploy_gitrepo)

This module provides a very simple server for creating github mirroring sites
with [deno deploy](https://deno.com/deploy).

# How to use?

### First Step

Place `serve.ts` in your repository with the following:

```ts
// serve.ts
import { serve } from "https://deploy-gitrepo.deno.dev/v0.0.3/serve.ts";

serve({
  owner: "your_account_name",
  repo: "your_repository_name",
});
```

### Second Step

Sign up for deno deploy, create a new project, and register serve.ts in "git
integration".

# Feature

### Supports version control of git tags.

- The URL looks like this: `https://<your_domain>/<version>/<path_to_file>`
- Great for delivering Deno modules.

### Specify the `converters` option to convert the content.

- You can convert markdown to HTML and use it as an alternative to github pages.
  - [This website](https://deploy-gitrepo.deno.dev/v0.0.3/README.md) is hosted
    by deploy_gitrepo.

```ts
// serve.ts
import { serve } from "https://deploy-gitrepo.deno.dev/v0.0.3/serve.ts";
import { mdToHTML } from "https://deploy-gitrepo.deno.dev/v0.0.3/md_to_html.ts";

const converters = [{
  // When `match` returns true, the` convert` function is called.
  match: (request: Request) => new URL(request.url).pathname.endsWith(".md"),
  convert: mdToHTML,
}];

serve({
  owner: "your_account_name",
  repo: "your_repository_name",
  converters,
});
```

- You can convert TypeScript to JavaScript and use it to deliver ES Modules.
  - This example returns TypeScript when accessed from Deno and transpiled
    JavaScript when accessed from a non-Deno (browser).
  - Override the response headers by setting the `headers` property in the
    return value of the convert function.

```ts
// serve.ts
import { serve } from "https://deploy-gitrepo.deno.dev/v0.0.3/serve.ts";
import { tsToJs } from "https://deploy-gitrepo.deno.dev/v0.0.3/ts_to_js.ts";

const converters = [{
  // Only the first matching converter will be used.
  match: (request: Request) =>
    new URL(request.url).pathname.endsWith(".ts") &&
    !request.headers.get("user-agent")?.includes("Deno"),
  convert: tsToJs,
}, {
  match: (request: Request) => {
    const { pathname } = new URL(request.url);
    return pathname.endsWith(".ts") || pathname.endsWith(".js");
  },
  convert: ({ content }: { content: string }) => ({
    content,
    headers: { "Access-Control-Allow-Origin": "*" },
  }),
}];

serve({
  owner: "your_account_name",
  repo: "your_repository_name",
  converters,
});
```

⚠️ Due to the CPU time limit of the deployment, it can be difficult to include
markdown conversion and TypeScript conversion at the same time. Both use wasm.
This may be resolved at https://github.com/denoland/deploy_feedback/issues/95.

### Supports github [personal access tokens](https://docs.github.com/ja/rest/guides/getting-started-with-the-rest-api#authentication).

- Internally this uses the github API to get the content.
- You can use it without a token, but you can use a token to increase the
  maximum number of requests.
- Set the token in an environment variable. In the argument of `serve()`,
  specify the key of the environment variable in which the token is set.

```ts
// serve.ts
import { serve } from "https://deploy-gitrepo.deno.dev/v0.0.3/serve.ts";

serve({
  owner: "your_account_name",
  repo: "your_repository_name",
  tokenKey: "key_of_token", // The key of the environment variable that stores the personal access token of github. (in short, `Deno.env.get("key_of_token")==="<your_token>"`)
});
```

# What is this?

This module is available in the code for deno deploy. However, it uses
`Deno.listen ()`, so it also works with the deno CLI.

# Link

[github](https://github.com/ayame113/deploy_gitrepo)
