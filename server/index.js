const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("A HTTP server listening on PORT:8080");
  })
  .listen(8080);

(async () => {
  const open = await import("open");
  open.default("http://localhost:8080");
})();
