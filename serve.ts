async function handleHttp(conn: Deno.Conn) {
  for await (const e of Deno.serveHttp(conn)) {
    e.respondWith(
      new Response(JSON.stringify({
        "import.meta.main": import.meta.main,
        "import.meta.url": import.meta.url,
        "Deno.cwd()": Deno.cwd(),
        "event.request.url": e.request.url,
      }), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    )
  }
}

for await (const conn of Deno.listen({ port: 80 })) {
  handleHttp(conn);
}
