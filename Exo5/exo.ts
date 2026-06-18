// Etape 1
import fs from "node:fs";
import path from "node:path";

function genererFichier() {
    const filePath = path.join(import.meta.dirname, "gros-fichier.txt");

    const stream = fs.createWriteStream(filePath);

    for (let i = 1; i <= 100_000; i++) {
        const ligne = `Ligne ${i} : ${Math.random().toString(36).substring(2)}\n`;
        stream.write(ligne);
    }

    stream.end();
    console.log("Fichier généré !");
}

genererFichier();

