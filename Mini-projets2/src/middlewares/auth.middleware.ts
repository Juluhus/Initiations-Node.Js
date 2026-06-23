import { Middleware } from "../core/contexte";
import { verifierToken } from "../utils/token";
import { Repository } from "../core/repository";
import { Utilisateur } from "../models/types";

const repo = new Repository<Utilisateur>("src/storage/utilisateurs.json");

export const authMiddleware: Middleware = async (ctx, next) => {
  const header = ctx.req.headers.authorization;

  if (!header) {
    return ctx.erreur("Token manquant", 401);
  }

  const token = header.replace("Bearer ", "");
  const payload = verifierToken(token);

  if (!payload) {
    return ctx.erreur("Token invalide", 401);
  }

  const user = await repo.trouverParId(payload.userId);

  if (!user) {
    return ctx.erreur("Utilisateur introuvable", 401);
  }

  ctx.utilisateur = {
    id: user.id,
    email: user.email,
  };

  await next();
};