export type Priorité = "basse" | "normale" | "haute";

export type StatutNote = "active" | "terminée";

export interface Note {
  id: number;
  contenu: string;
  tags: string[];
  priorité: Priorité;
  statut: StatutNote;
  créeÀ: string;
  modifiéeÀ: string;
}