export type Utilisateur = {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
  creeA?: string;
  modifieA?: string;
};

export type Tache = {
  id: number;
  userId: number;
  titre: string;
  description?: string;
  priorite?: "basse" | "moyenne" | "haute";
  terminee: boolean;
  creeA?: string;
  modifieA?: string;
};