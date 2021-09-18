addEventListener("fetch", (event) => {
  event.respondWith(
    new Response(
      "export const aaa = " + JSON.stringify(
        {
          url: event.request.url,
          method: event.request.method,
          proto: event.request.proto,
          headers: Object.fromEntries(event.request.headers.entries()),
        },
        null,
        2,
      ),
      {
        headers: { "content-type": "application/json; charset=UTF-8" },
      },
    ),
  );
});
