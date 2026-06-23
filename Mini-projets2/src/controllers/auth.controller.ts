import { Contexte } from "../core/contexte";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export const authController = {
  inscription: async (ctx: Contexte) => {
    const body = await ctx.lireBody<any>();

    try {
      const result = await service.inscrire(
        body.nom,
        body.email,
        body.motDePasse
      );

      ctx.json(result);
    } catch (e: any) {
      ctx.erreur(e.message);
    }
  },

  connexion: async (ctx: Contexte) => {
    const body = await ctx.lireBody<any>();

    try {
      const result = await service.connexion(
        body.email,
        body.motDePasse
      );

      ctx.json(result);
    } catch (e: any) {
      ctx.erreur(e.message, 401);
    }
  },
};