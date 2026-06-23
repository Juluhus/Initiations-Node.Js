import { Repository } from "../core/repository";
import { Utilisateur } from "../models/types";
import { genererToken } from "../utils/token";

const repo = new Repository<Utilisateur>("src/storage/utilisateurs.json");

export class AuthService {
  async inscrire(nom: string, email: string, motDePasse: string) {
    const existant = await repo.trouverTous({ email });
    if (existant.length > 0) throw new Error("Email déjà utilisé");

    const utilisateur = await repo.creer({
      nom,
      email,
      motDePasse,
    });

    const token = genererToken({
      userId: utilisateur.id,
      email: utilisateur.email,
      exp: Date.now() + 86400000,
    });

    return { utilisateur, token };
  }

  async connexion(email: string, motDePasse: string) {
    const users = await repo.trouverTous({ email });

    const user = users[0];
    if (!user || user.motDePasse !== motDePasse) {
      throw new Error("Identifiants invalides");
    }

    const token = genererToken({
      userId: user.id,
      email: user.email,
      exp: Date.now() + 86400000,
    });

    return { utilisateur: user, token };
  }
}