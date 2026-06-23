import { IncomingMessage, ServerResponse } from "http";

export async function logger(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => Promise<void>
) {
  const debut = Date.now();

  await next();

  const duree = Date.now() - debut;

  console.log(
    `[${req.method}] ${req.url} — ${res.statusCode} — ${duree}ms`
  );
}