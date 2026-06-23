import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        message: "API running (native Node.js)"
      })
    );
  }
);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});