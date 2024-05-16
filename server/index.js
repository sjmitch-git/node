const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  })
  .listen(8080);

(async () => {
  const open = await import("open");
  open.default("http://localhost:8080");
})();
