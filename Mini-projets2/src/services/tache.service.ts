import { Repository } from "../core/repository";
import { Tache } from "../models/types";

const repo = new Repository<Tache>("src/storage/taches.json");

export class TacheService {
  lister(userId: number) {
    return repo.trouverTous({ userId });
  }

  creer(userId: number, data: Partial<Tache>) {
    return repo.creer({
      userId,
      titre: data.titre!,
      description: data.description,
      priorite: data.priorite,
      terminee: false,
    });
  }

  trouver(userId: number, id: number) {
    return repo.trouverTous({ id, userId }).then((r) => r[0]);
  }

  async modifier(userId: number, id: number, data: Partial<Tache>) {
    const tache = await this.trouver(userId, id);
    if (!tache) throw new Error("Tâche introuvable");

    return repo.modifier(id, data);
  }

  async supprimer(userId: number, id: number) {
    const tache = await this.trouver(userId, id);
    if (!tache) return false;

    return repo.supprimer(id);
  }

  async stats(userId: number) {
    const taches = await repo.trouverTous({ userId });

    return {
      total: taches.length,
      terminees: taches.filter((t) => t.terminee).length,
      enCours: taches.filter((t) => !t.terminee).length,
      parPriorite: {
        basse: taches.filter((t) => t.priorite === "basse").length,
        moyenne: taches.filter((t) => t.priorite === "moyenne").length,
        haute: taches.filter((t) => t.priorite === "haute").length,
      },
    };
  }
}