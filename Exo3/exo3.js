"use strict";
// import { writeFileSync } from 'node:fs';
// import nodeFs = require("node:fs");
// try {
//     writeFileSync('donnees/journal.txt', "A smile doesn’t cost anything, but it can change everything—your mood, someone else’s day, and even the tone of an entire interaction. The more it is shared, the more it spreads, without ever being used up.", 'utf-8');
//     console.log('Fichier édité avec succès !');
// } catch (erreur) {
//     console.log(erreur);
// }
// Etape1
// const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '/donnees/journal.txt')
// Methode Sync
// const dataSync = fs.readFileSync(filePath, 'utf8');
// const dataAdded = fs.appendFileSync(filePath, '\n Message ajouter recemment')
// console.log(dataSync);
// fs (File System) est un module de nodejs qui permet de lire, ecrire, modifier et gerer des fichiers sur un ordinateur.
// Deux façon de travailler avec fs (Synchrone et Asynchrone)
// fs.readFileSync -> lire de maniere synchrone
// fs.writeFileSync -> crée le fichier s’il n’existe pas, remplace le contenu s’il existe déjà
// fs.appendFileSync -> ajouter du contenu
// fs.unlinkSync -> supprimer du contenu
// Methode Async
//Lire
// const dataAsyncRead = fs.readFile(filePath, 'utf8', (err: Error, data: string) => {
//     if (err) {
//         console.log('Erreur: ', err);
//         return;
//     }
//     console.log(data); 
// });
//Ecrire
// const dataAsyncWrite = fs.writeFile(filePath, "Je suis un nouveau message.", (err: Error, data: string){
//     if (err) {
//         console.log('Erreur: ', err.message);
//         return;
//     }
//     console.log(data);
// });
// Methode async/await
//Lire
// const fs = require('fs/promises');
// const path = require('path');
// const filePath = path.join(__dirname, '/donnees/journal.txt');
// async function readFiles() {
//     const data = await fs.readFile(filePath, 'utf8');
//     console.log(data);
// }
// readFiles();
//Ecrire
// async function appendText(text: string) {
//     const dataAdded: string = await fs.appendFile(filePath, text, (err: Error, data: string) => {
//         if (err) {
//             console.log('Erreur: ', err.message);
//             return;
//         }
//         console.log(dataAdded);
//     })
// }
// appendText("Un texte ajouter avec l'asynchronisme hihihi");
// Etape2
const fs = require('fs/promises');
const path = require('path');
async function listerFichier(dossier) {
    try {
        const elements = await fs.readdir(dossier);
        const fichiers = [];
        for (const element of elements) {
            const cheminComplet = path.join(dossier, element);
            const stats = await fs.stat(cheminComplet);
            if (stats.isFile()) {
                fichiers.push(element);
                console.log(`Nom: ${element} | Taille: ${stats.size} octets`);
            }
        }
        return fichiers;
    }
    catch (err) {
        console.error("Erreur :", err);
        return [];
    }
}
