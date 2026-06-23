import { initialiserStockage } from "./storage";
import { parserArguments } from "./parser";
import { ServiceNotes } from "./services/ServiceNotes";
import { afficherNotes, afficherErreur } from "./utils/affichage";

// Etape1
await initialiserStockage();
console.log("Stockage prêt");

// Etape2
const commande = parserArguments(process.argv);
console.log(commande);

// Etape3

async function main() {
    const service = new ServiceNotes();

    try {
        const { commande, args, flags } =
            parserArguments(process.argv);

        switch (commande) {
            case "ajouter": {
                const contenu = args.join(" ");

                if (!contenu) {
                    afficherErreur("Contenu manquant");
                    return;
                }

                const note = await service.ajouter(
                    contenu,
                    (flags.tag ? [flags.tag] : []),
                    (flags.priorité as any) || "normale"
                );

                console.log("Note créée :");
                console.log(note);
                break;
            }

            case "lister": {
                const notes = await service.lister({
                    tag: flags.tag,
                    priorité: flags.priorité as any,
                    statut: flags.statut as any,
                });

                afficherNotes(notes);
                break;
            }

            case "chercher": {
                const query = args.join(" ");

                const notes = await service.chercher(query);
                afficherNotes(notes);
                break;
            }

            case "terminer": {
                const id = Number(args[0]);

                if (!id) {
                    afficherErreur("ID invalide");
                    return;
                }

                await service.terminer(id);
                console.log("Note terminée");
                break;
            }

            case "supprimer": {
                const id = Number(args[0]);

                if (!id) {
                    afficherErreur("ID invalide");
                    return;
                }

                await service.supprimer(id);
                console.log("Note supprimée");
                break;
            }

            case "exporter": {
                const format =
                    (flags.format as "json" | "csv") ||
                    "json";

                const data = await service.exporter(format);
                console.log(data);
                break;
            }

            case "stats": {
                const stats = await service.stats();
                console.log(stats);
                break;
            }

            default:
                afficherErreur("Commande inconnue");
        }
    } catch (err: any) {
        afficherErreur(err.message);
    }
}

main();