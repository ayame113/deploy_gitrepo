addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(JSON.stringify({importMeta: import.meta.main, cwd: Deno.cwd(), url: event.request.url}), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  );
});
