import marked from "https://esm.sh/marked";
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
//import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js";
import hljs from "https://jspm.dev/highlight.js";

marked.setOptions({
  highlight: function (code, lang) {
    console.log(code);
    console.log(lang);
    // @ts-ignore
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    // @ts-ignore
    return hljs.highlight(code, { language }).value;
  },
});
await ammonia.init();

export function mdToHTML({ content }: { content: string }) {
  return {
    content: `<head>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@3.0.1/github-markdown.min.css">
			<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.2.0/styles/default.min.css">
			</head><body class="markdown-body">${
      ammonia.clean(marked(content))
    }</body>`,
    headers: {
      "content-type": "text/html",
    },
  };
}
console.log(
  mdToHTML({
    content: `
# a

\`\`\`ts

console.log('aaa');
\`\`\`
	`,
  }).content,
);
