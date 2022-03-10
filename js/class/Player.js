  export default class Player {
    constructor(gametag) {
      this.gametag = gametag;
    }

    setgametag(newgametag) {
      this.gametag = newgametag;
    }

    setFighter(fighter) {
      if(typeof fighter === 'object' && fighter !== null) {
        this.fighter = fighter;
      }else {
        throw new Error("This isn't an Fighter\n");
      }
    }
  }