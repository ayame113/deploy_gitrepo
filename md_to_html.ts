import marked from "https://esm.sh/marked";
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();

export function mdToHTML({ content }: { content: string }) {
  return {
    content:
      `<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@3.0.1/github-markdown.min.css"></head><body>${
        ammonia.clean(marked(content))
      }</body>`,
    headers: {
      "content-type": "text/html",
    },
  };
}
