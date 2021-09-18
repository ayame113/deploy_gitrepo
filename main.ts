import { serve } from "./serve.ts";

const converters = [{
  match: /(.*)\?js=true/,
  convert({ content }: { url: URL; content: string }) {
    return {
      content,
      headers: { "content-type": "application/javascript" },
    };
  },
}, {
  match: /(.*)/,
  convert({ content }: { url: URL; content: string }) {
    return {
      content,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  },
}];

serve({
  owner: "ayame113",
  repo: "deploy_gitrepo",
  converters,
});
