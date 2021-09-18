import { serve } from "./serve.ts";

const converters = [{
  match(request: Request) {
    return !request.headers.get("user-agent")?.includes("Deno");
  },
  convert({ content }: { url: URL; content: string }) {
    return {
      content,
      headers: {
        "content-type": "application/javascript",
        "Access-Control-Allow-Origin": "*",
      },
    };
  },
}, {
  match() {
    return true;
  },
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
