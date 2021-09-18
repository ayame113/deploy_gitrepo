import marked from "https://esm.sh/marked";
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();

export function mdToHTML({ content }: { content: string }) {
  return {
    content: ammonia.clean(marked(content)),
    headers: {
      "content-type": "text/html",
    },
  };
}
