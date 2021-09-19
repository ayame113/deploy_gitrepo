import marked from "https://esm.sh/marked@3.0.4";
import {
  Ammonia,
  AmmoniaBuilder,
  init,
} from "https://deno.land/x/ammonia@0.3.1/mod.ts";
import hljs from "https://jspm.dev/highlight.js@11.2.0";

// setup markd
marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: "hljs language-",
  highlight: function (code, lang) {
    // @ts-ignore: hljs type definition does not exist
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    // @ts-ignore: hljs type definition does not exist
    return hljs.highlight(code, { language }).value;
  },
  gfm: true,
});

// setup ammonia
await init();
const builder = new AmmoniaBuilder();
builder.genericAttributes.add("class");
builder.build();
const ammonia = new Ammonia(builder);

export function mdToHTML({ content }: { content: string }) {
  return {
    content: `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@3.0.1/github-markdown.min.css">
          <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.2.0/styles/default.min.css">
        </head>
        <body class="markdown-body">${ammonia.clean(marked(content))}</body>
      </html>
    `,
    headers: {
      "content-type": "text/html",
    },
  };
}
