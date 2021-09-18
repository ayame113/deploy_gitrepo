import { transform } from "https://deno.land/x/swc@0.1.4/mod.ts";

export function tsToJs({ content }: { content: string }) {
  return {
    content: transform(content, {
      jsc: {
        target: "es2021",
        parser: {
          syntax: "typescript",
        },
      },
    } as any).code,
    headers: {
      "content-type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
    },
  };
}
