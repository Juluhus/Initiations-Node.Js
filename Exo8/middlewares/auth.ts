import { IncomingMessage, ServerResponse } from "http";

export async function auth(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => Promise<void>
) {
  if (req.url?.startsWith("/santé")) {
    await next();
    return;
  }

  const authorization =
    req.headers.authorization;

  if (authorization !== "Bearer token123") {
    res.statusCode = 401;

    res.end(
      JSON.stringify({
        erreur: "Non autorisé",
      })
    );

    return;
  }

  await next();
}