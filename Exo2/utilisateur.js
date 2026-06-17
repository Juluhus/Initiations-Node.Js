class Utilisateur {
  constructor(nom, email) {
    this.nom = nom;
    this.email = email;
  }
  presenter() {
    return `Salut!!! Je suis ${this.nom}`;
  }
}

module.exports = {
  Utilisateur,
};
