import { lireFichierJSON, ecrireFichierJSON } from "../utils/fichiers";

export type BaseEntity = {
  id: number;
  creeA?: string;
  modifieA?: string;
};

export class Repository<T extends BaseEntity> {
  constructor(private fichier: string) {}

  private async charger(): Promise<T[]> {
    return await lireFichierJSON<T[]>(this.fichier);
  }

  private async sauvegarder(data: T[]): Promise<void> {
    await ecrireFichierJSON(this.fichier, data);
  }

  async trouverTous(filtre?: Partial<T>): Promise<T[]> {
    const data = await this.charger();

    if (!filtre) return data;

    return data.filter((item) =>
      Object.entries(filtre).every(
        ([key, value]) => (item as any)[key] === value
      )
    );
  }

  async trouverParId(id: number): Promise<T | undefined> {
    const data = await this.charger();
    return data.find((item) => item.id === id);
  }

  async creer(
    donnees: Omit<T, "id" | "creeA" | "modifieA">
  ): Promise<T> {
    const data = await this.charger();

    const nouveau: T = {
      ...(donnees as any),
      id: Date.now(),
      creeA: new Date().toISOString(),
      modifieA: new Date().toISOString(),
    };

    data.push(nouveau);
    await this.sauvegarder(data);

    return nouveau;
  }

  async modifier(id: number, donnees: Partial<T>): Promise<T> {
    const data = await this.charger();

    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Element introuvable");

    data[index] = {
      ...data[index],
      ...donnees,
      modifieA: new Date().toISOString(),
    };

    await this.sauvegarder(data);

    return data[index];
  }

  async supprimer(id: number): Promise<boolean> {
    const data = await this.charger();

    const nouvelleListe = data.filter((item) => item.id !== id);

    if (nouvelleListe.length === data.length) return false;

    await this.sauvegarder(nouvelleListe);
    return true;
  }
}