addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(JSON.stringify({
      "import.meta.main": import.meta.main,
      "import.meta.url": import.meta.url,
      "Deno.cwd()": Deno.cwd(),
      "event.request.url": event.request.url,
    }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  );
});
