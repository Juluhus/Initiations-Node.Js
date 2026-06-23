// Etape 1
export {};
// "/utilisateurs/alice/documents/fichier.txt"
// "/utilisateurs/bob/fichier.txt"
// "/home/user/relatif/chemin"
// "fichier.txt"
// "fichier"
// ".gz"
// {
//   root: "/",
//   dir: "/utilisateurs/alice",
//   base: "fichier.txt",
//   ext: ".txt",
//   name: "fichier"
// }
// Etape 2
// import fs from "node:fs/promises";
// import path from "node:path";
// type Structure = {
//     [key: string]: string | Structure;
// };
// async function construireArborescence(
//     racine: string,
//     structure: Structure
// ): Promise<void> {
//     await fs.mkdir(racine, { recursive: true });
//     for (const [nom, contenu] of Object.entries(structure)) {
//         const chemin = path.join(racine, nom);
//         if (typeof contenu === "string") {
//             await fs.writeFile(chemin, contenu, "utf8");
//         } else {
//             await construireArborescence(chemin, contenu);
//         }
//     }
// }
// Etape 3
// import fs from "node:fs/promises";
// import path from "node:path";
// async function trouverFichiers(
//     dossier: string,
//     extension: string
// ): Promise<string[]> {
//     let resultats: string[] = [];
//     const elements = await fs.readdir(dossier);
//     for (const element of elements) {
//         const chemin = path.join(dossier, element);
//         const stats = await fs.stat(chemin);
//         if (stats.isDirectory()) {
//             const sousFichiers = await trouverFichiers(chemin, extension);
//             resultats.push(...sousFichiers);
//         }
//         if (stats.isFile() && chemin.endsWith(extension)) {
//             resultats.push(path.resolve(chemin));
//         }
//     }
//     return resultats;
// }
//# sourceMappingURL=exo.js.map