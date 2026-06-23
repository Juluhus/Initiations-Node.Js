import { IncomingMessage, ServerResponse } from "http";

export type Params = Record<string, string>;
export type Query = Record<string, string>;

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
  params: Params,
  query: Query
) => Promise<void> | void;

export class Router {
  private routes: {
    method: string;
    path: string;
    handler: Handler;
  }[] = [];

  get(path: string, handler: Handler) {
    this.routes.push({
      method: "GET",
      path,
      handler,
    });
  }

  post(path: string, handler: Handler) {
    this.routes.push({
      method: "POST",
      path,
      handler,
    });
  }

  match(method: string, pathname: string) {
    for (const route of this.routes) {
      if (route.method !== method) continue;

      const params: Params = {};

      const routeParts = route.path
        .split("/")
        .filter(Boolean);

      const pathParts = pathname
        .split("/")
        .filter(Boolean);

      if (routeParts.length !== pathParts.length) {
        continue;
      }

      let matched = true;

      for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i];
        const pathPart = pathParts[i];

        if (routePart.startsWith(":")) {
          params[routePart.slice(1)] = pathPart;
        } else if (routePart !== pathPart) {
          matched = false;
          break;
        }
      }

      if (matched) {
        return {
          handler: route.handler,
          params,
        };
      }
    }

    return null;
  }
}