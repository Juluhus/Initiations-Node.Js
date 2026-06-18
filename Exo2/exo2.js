const { additionner, multiplier, PI} = require('./mathematique');
const  Utilisateur  = require("./utilisateur");

const user1 = new Utilisateur("John DOE", "john@gmail.com");

console.log(user1.presenter()); 