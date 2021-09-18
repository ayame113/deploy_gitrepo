import { contentType } from "https://deno.land/x/media_types@v2.10.2/mod.ts";
import * as path from "https://deno.land/std@0.107.0/path/mod.ts";

import { getFile } from "./fetch_git.ts";

async function handleHttp(conn: Deno.Conn, {
  owner,
  repo,
  tokenKey,
  converters = [],
}: {
  owner: string;
  repo: string;
  tokenKey?: string;
  converters?: {
    match: RegExp;
    convert: (arg: {
      url: URL;
      content: string;
    }) =>
      | { content: string; headers: Record<string, string> }
      | Promise<{ content: string; headers: Record<string, string> }>;
  }[];
}) {
  for await (const event of Deno.serveHttp(conn)) {
    try {
      const url = new URL(event.request.url);
      const [branch, ...pathList] = url.pathname.slice(1)
        .split("/");
      let content = await getFile({
        owner,
        repo,
        path: pathList.join("/"),
        branch,
        tokenKey,
      });
      let headers = {
        "content-type": contentType(path.extname(event.request.url)) ??
          "text/plain",
      };
      for (const converter of converters) {
        if (converter.match.test(event.request.url)) {
          const converted = (await converter.convert({
            url,
            content,
          }));
          content = converted.content;
          headers = {
            ...headers,
            ...converted.headers,
          };
          break;
        }
      }
      event.respondWith(
        new Response(content, {
          status: 200,
          headers,
        }),
      );
    } catch (error) {
      console.log(error);
      event.respondWith(
        new Response("404 Not Found", {
          status: 404,
          headers: {
            "content-type": "text/plain",
          },
        }),
      );
    }
  }
}

export async function serve({
  owner,
  repo,
  tokenKey,
  converters,
}: {
  owner: string;
  repo: string;
  tokenKey?: string;
  converters?: {
    match: RegExp;
    convert: (arg: {
      url: URL;
      content: string;
    }) =>
      | { content: string; headers: Record<string, string> }
      | Promise<{ content: string; headers: Record<string, string> }>;
  }[];
}) {
  for await (const conn of Deno.listen({ port: 80 })) {
    handleHttp(conn, { owner, repo, tokenKey, converters });
  }
}
