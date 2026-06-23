export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
}

export const utilisateurs: Utilisateur[] = [];

export let prochainId = 1;

export function creerUtilisateur(
  nom: string,
  email: string
): Utilisateur {
  const utilisateur: Utilisateur = {
    id: prochainId++,
    nom,
    email,
  };

  utilisateurs.push(utilisateur);

  return utilisateur;
}