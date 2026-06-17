import { .writeFileSync } from 'node:fs';

try {
    writeFileSync('donnees/journal.txt', "A smile doesn’t cost anything, but it can change everything—your mood, someone else’s day, and even the tone of an entire interaction. The more it is shared, the more it spreads, without ever being used up.", 'utf-8');
    console.log('Fichier édité avec succès !');
} catch (erreur) {
    console.log(erreur);
}

