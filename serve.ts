import { contentType } from "https://deno.land/x/media_types@v2.10.2/mod.ts";
import * as path from "https://deno.land/std@0.107.0/path/mod.ts";

import { getFile } from "./fetch_git.ts";

async function handleHttp(conn: Deno.Conn, {
  owner,
  repo,
  tokenKey,
}: {
  owner: string;
  repo: string;
  tokenKey?: string;
}) {
  for await (const event of Deno.serveHttp(conn)) {
    const [branch, ...pathList] = new URL(event.request.url).pathname.slice(1)
      .split("/");
    event.respondWith(
      new Response(
        await getFile({
          owner,
          repo,
          path: pathList.join("/"),
          branch,
          tokenKey,
        }),
        {
          status: 200,
          headers: {
            "content-type": contentType(path.extname(event.request.url)) ??
              "text/plain",
            "Access-Control-Allow-Origin": "*",
          },
        },
      ),
    );
  }
}

export async function serve({
  owner,
  repo,
  tokenKey,
}: {
  owner: string;
  repo: string;
  tokenKey?: string;
}) {
  for await (const conn of Deno.listen({ port: 80 })) {
    handleHttp(conn, { owner, repo, tokenKey });
  }
}
