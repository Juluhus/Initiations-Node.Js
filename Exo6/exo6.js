import { Minuteur } from "./Minuteur";
import { FileDePriorite } from "./FileDePriorite";
const minuteur = new Minuteur(3);
minuteur.on("tick", (s) => console.log(`${s}s...`));
minuteur.on("terminé", () => console.log("Terminé !"));
minuteur.on("erreur", (err) => console.error(err.message));
minuteur.démarrer();
const file = new FileDePriorite();
file.on("ajout", (v, p) => console.log(`Ajout: ${v} (${p})`));
file.on("traitement", (v) => console.log(`Traitement: ${v}`));
file.on("vide", () => console.log("Vide"));
file.ajouter("A", 1);
file.ajouter("B", 10);
file.traiterProchain();
//# sourceMappingURL=exo6.js.map