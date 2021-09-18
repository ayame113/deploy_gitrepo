import { serve } from "./serve.ts";
import { tsToJs } from "./ts_to_js.ts";

const converters = [{
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
