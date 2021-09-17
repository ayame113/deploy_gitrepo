addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(JSON.stringify({
      importMetaMain: import.meta.main,
      importMetaURL: import.meta.url,
      cwd: Deno.cwd(),
      requestURL: event.request.url,
    }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  );
});
