  class Player {
    constructor(pseudo) {
      this.pseudo = pseudo;
    }

    setPseudo(newPseudo) {
      this.pseudo = newPseudo;
    }

    setFighter(fighter) {
      if(fighter instanceof Fighter) {
        this.fighter = fighter;
      }else {
        throw new Error("This isn't an Fighter\n");
      }
    }
  }