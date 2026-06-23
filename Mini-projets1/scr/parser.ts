export type Commande = "ajouter" | "lister" | "chercher" | "terminer" | "supprimer" | "exporter" | "stats";

export interface ParsedCommand {
  commande: Commande;
  args: string[];
  flags: Record<string, string>;
}

const COMMANDES: Commande[] = [
  "ajouter",
  "lister",
  "chercher",
  "terminer",
  "supprimer",
  "exporter",
  "stats",
];

export function parserArguments(
  argv: string[]
): ParsedCommand {
  const [, , commandeBrute, ...reste] = argv;

  if (
    !commandeBrute ||
    !COMMANDES.includes(
      commandeBrute as Commande
    )
  ) {
    throw new Error(
      "Commande inconnue"
    );
  }

  const args: string[] = [];
  const flags: Record<
    string,
    string
  > = {};

  for (let i = 0; i < reste.length; i++) {
    const element = reste[i];

    if (element.startsWith("--")) {
      const nomFlag =
        element.slice(2);

      const valeur =
        reste[i + 1];

      if (
        valeur &&
        !valeur.startsWith("--")
      ) {
        flags[nomFlag] = valeur;
        i++;
      } else {
        flags[nomFlag] = "true";
      }
    } else {
      args.push(element);
    }
  }

  return {
    commande:
      commandeBrute as Commande,
    args,
    flags,
  };
}