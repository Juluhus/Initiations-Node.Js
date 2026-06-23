// Etape 1
export function parserArgs(argv: string[]) {
  const flags: Record<string, string | boolean> = {};
  const positionnels: string[] = [];

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];

      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionnels.push(arg);
    }
  }

  return { flags, positionnels };
}

// Etape 2

type FlagsResult<S> = {
  [K in keyof S]?: S[K];
};

export function parserArgsTyped<S extends Record<string, any>>(
  argv: string[]
): {
  flags: FlagsResult<S>;
  positionnels: string[];
} {
  const flags: Record<string, any> = {};
  const positionnels: string[] = [];

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];

      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionnels.push(arg);
    }
  }

  return {
    flags: flags as FlagsResult<S>,
    positionnels,
  };
}

// Etape 3
import { readFile, writeFile } from "fs/promises";

async function executerCommande(entree: string): Promise<void> {
  const [commande, ...args] = entree.trim().split(" ");

  switch (commande) {
    case "lire": {
      const chemin = args[0];

      if (!chemin) {
        console.log("Usage : lire <chemin>");
        return;
      }

      try {
        const contenu = await readFile(chemin, "utf-8");
        console.log(contenu);
      } catch (erreur: any) {
        switch (erreur.code) {
          case "ENOENT":
            console.log(`Erreur : le fichier "${chemin}" n'existe pas.`);
            break;
          case "EACCES":
          case "EPERM":
            console.log(
              `Erreur : permissions insuffisantes pour lire "${chemin}".`
            );
            break;
          default:
            console.log(
              `Erreur lors de la lecture du fichier "${chemin}".`
            );
        }
      }
      break;
    }

    case "écrire":
    case "ecrire": {
      const chemin = args[0];

      if (!chemin) {
        console.log("Usage : écrire <chemin> <contenu>");
        return;
      }

      const contenu = args.slice(1).join(" ");

      try {
        await writeFile(chemin, contenu, "utf-8");
        console.log(`Fichier "${chemin}" enregistré avec succès.`);
      } catch (erreur: any) {
        switch (erreur.code) {
          case "EACCES":
          case "EPERM":
            console.log(
              `Erreur : permissions insuffisantes pour écrire dans "${chemin}".`
            );
            break;
          case "ENOENT":
            console.log(
              `Erreur : le dossier contenant "${chemin}" n'existe pas.`
            );
            break;
          default:
            console.log(
              `Erreur lors de l'écriture du fichier "${chemin}".`
            );
        }
      }
      break;
    }

    default:
      console.log(`Commande inconnue : ${commande}`);
  }
}

