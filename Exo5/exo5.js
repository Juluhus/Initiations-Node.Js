// Etape 1
// import fs from "node:fs";
// import path from "node:path";
export {};
// function genererFichier() {
//     const filePath = path.join(import.meta.dirname, "gros-fichier.txt");
//     const stream = fs.createWriteStream(filePath);
//     for (let i = 1; i <= 100_000; i++) {
//         const ligne = `Ligne ${i} : ${Math.random().toString(36).substring(2)}\n`;
//         stream.write(ligne);
//     }
//     stream.end();
//     console.log("Fichier généré !");
// }
// genererFichier();
// Etape 2
// import fs from "node:fs";
// import readline from "readline";
// export async function compter(chemin: string): Promise<number> {
//     const fileStream = fs.createReadStream(chemin, {encoding: "utf-8"});
//     const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});
//     let count = 0;
//     for await (const _line of rl) {
//         count++;
//     }
//     return count;
// }
// console.log(compter("gros-fichier.txt"));
// Etape 3
// import fs from "fs";
// import readline from "readline";
// export async function filtrerVersCSV(
//   source: string,
//   destination: string,
//   predicate: (ligne: string) => boolean
// ): Promise<void> {
//   const input = fs.createReadStream(source, { encoding: "utf-8" });
//   const output = fs.createWriteStream(destination, { encoding: "utf-8" });
//   const rl = readline.createInterface({
//     input,
//     crlfDelay: Infinity,
//   });
//   for await (const line of rl) {
//     if (predicate(line)) {
//       output.write(line + "\n");
//     }
//   }
//   output.end();
// }
// Etape 4
// async function transformerFichier() {
//   const input = fs.createReadStream("gros-fichier.txt", {
//     encoding: "utf-8",
//   });
//   const rl = readline.createInterface({
//     input,
//     crlfDelay: Infinity,
//   });
//   const output = fs.createWriteStream("gros-fichier-majuscules.txt", {
//     encoding: "utf-8",
//   });
//   await pipeline(
//     rl,
//     upperCaseTransform,
//     output
//   );
// }
// transformerFichier();
//# sourceMappingURL=exo5.js.map