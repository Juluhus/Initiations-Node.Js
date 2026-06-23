import { IncomingMessage, ServerResponse } from "http";

export interface UtilisateurSession {
  id: string;
  email: string;
}

export interface Contexte {
  req: IncomingMessage;
  res: ServerResponse;

  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;

  utilisateur?: UtilisateurSession;
}

export type Handler = (ctx: Contexte) => Promise<void>;

export type Middleware = (
  ctx: Contexte,
  suivant: () => Promise<void>
) => Promise<void>;

export interface Contexte {
  req: IncomingMessage;
  res: ServerResponse;

  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;

  utilisateur?: UtilisateurSession;

  json: (data: unknown, status?: number) => void;
  erreur: (message: string, status?: number) => void;
  lireBody: <T>() => Promise<T>;
}

export function enrichirContexte(ctx: Contexte) {
  const res = ctx.res;

  ctx.json = function (donnees: unknown, status = 200) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(donnees));
  };


  ctx.erreur = function (message: string, status = 400) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: true,
        message,
        status,
      })
    );
  };


  ctx.lireBody = function <T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = "";

      ctx.req.on("data", (chunk) => {
        data += chunk;
      });

      ctx.req.on("end", () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve(parsed as T);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  return ctx;
}