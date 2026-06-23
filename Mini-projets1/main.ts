import { initialiserStockage } from "./storage";
import { parserArguments } from "./parser";

// Etape1
await initialiserStockage();
console.log("Stockage prêt");

// Etape2
const commande =
  parserArguments(process.argv);
console.log(commande);