import { Note } from "../types";

function symbolePriorité(
  priorité: Note["priorité"]
): string {
  switch (priorité) {
    case "haute":
      return "[!]";

    case "normale":
      return "[ ]";

    case "basse":
      return "[.]";
  }
}

export function afficherNote(
  note: Note
): void {
  const statut =
    note.statut === "terminée"
      ? "[✓]"
      : "   ";

  console.log(
    `${statut} ${symbolePriorité(
      note.priorité
    )} #${note.id} ${
      note.contenu
    }`
  );

  console.log(
    `    Tags: ${note.tags.join(
      ", "
    )}`
  );

  console.log(
    `    Statut: ${note.statut}`
  );

  console.log("");
}

export function afficherNotes(
  notes: Note[]
): void {
  if (notes.length === 0) {
    console.log(
      "Aucune note trouvée."
    );
    return;
  }

  for (const note of notes) {
    afficherNote(note);
  }
}

export function afficherErreur(
  message: string
): void {
  process.stderr.write(
    `Erreur: ${message}\n`
  );
}