// const args:string[] = process.argv;
// console.log(args);

// const command: string = process.argv[0];
// console.log("Commande :", command);

// const args: string[] = process.argv.slice(2);

// const command: string = args[0];
// const content: string = args[1];

// console.log({command, content });

// const flags: any = {};

// for (let i = 0; i < args.length; i++) {
//   if (args[i].startsWith("--")) {
//     const key = args[i].replace("--", "");
//     const value = args[i + 1];
//     flags[key] = value;
//   }
// }

// 1) NODE.JS + process.argv (communication terminal)

// EXercice 1

// const args: string[] = process.argv;

// for (let index = 2; index < args.length; index++) {
//     console.log(args[index]);
// }

// Exercice 2

const args: string[] = process.argv;
console.log(`Commande : ${args[2]}`);

