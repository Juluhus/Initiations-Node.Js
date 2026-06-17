//Etape1
console.log("1. La version de Node.js en cours d'exécution : ", process.version);
console.log("2. Le répertoire courant d'exécution est : ", __dirname);
console.log("3. Le chemin absolu du fichier en cours d'exécution : ", __filename);
console.log("4. Les arguments passés en ligne de commande : ", process.argv);

//Etape2
console.log("========   Variable d'environnement  ========");
console.log(process.env);
console.log("Variable NOM :", process.env.NOM);

//Etape3
console.log("======== Informations sur le processus ========");
console.log("Plateforme :", process.platform);
console.log("PID :", process.pid);
console.log("Mémoire utilisée :", process.memoryUsage());
