import { decode } from "https://deno.land/std@0.107.0/encoding/base64.ts";

const decoder = new TextDecoder();

export async function getFile({
  owner,
  repo,
  path,
  branch,
  tokenKey,
}: {
  owner: string;
  repo: string;
  path: string;
  branch: string;
  tokenKey?: string;
}) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: tokenKey
        ? { authorization: `token ${Deno.env.get(tokenKey)}` }
        : {},
    },
  );
  const data = await res.json();
  return decoder.decode(decode(data.content));
}
