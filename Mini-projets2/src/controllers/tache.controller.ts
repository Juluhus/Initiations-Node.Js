import { Contexte } from "../core/contexte";
import { TacheService } from "../services/tache.service";

const service = new TacheService();

export const tacheController = {
  lister: async (ctx: Contexte) => {
    const data = await service.lister(ctx.utilisateur!.id);
    ctx.json(data);
  },

  creer: async (ctx: Contexte) => {
    const body = await ctx.lireBody<any>();
    const data = await service.creer(ctx.utilisateur!.id, body);
    ctx.json(data);
  },

  trouver: async (ctx: Contexte) => {
    const id = Number(ctx.params.id);
    const data = await service.trouver(ctx.utilisateur!.id, id);

    if (!data) return ctx.erreur("Introuvable", 404);

    ctx.json(data);
  },

  modifier: async (ctx: Contexte) => {
    const id = Number(ctx.params.id);
    const body = await ctx.lireBody<any>();

    try {
      const data = await service.modifier(ctx.utilisateur!.id, id, body);
      ctx.json(data);
    } catch (e: any) {
      ctx.erreur(e.message);
    }
  },

  supprimer: async (ctx: Contexte) => {
    const id = Number(ctx.params.id);
    const ok = await service.supprimer(ctx.utilisateur!.id, id);

    if (!ok) return ctx.erreur("Introuvable", 404);

    ctx.json({ success: true });
  },

  stats: async (ctx: Contexte) => {
    const data = await service.stats(ctx.utilisateur!.id);
    ctx.json(data);
  },
};