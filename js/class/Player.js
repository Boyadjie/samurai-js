import Fighter from "./Fighter.js";

  export default class Player {
    constructor(gametag, side) {
      this.gametag = gametag;
      this.side = side;
    }

    setFighter(fighter) {
      if(typeof fighter === 'object' && fighter !== null && fighter instanceof Fighter) {
        this.fighter = fighter;
      }else {
        throw new Error("This isn't an Fighter\n");
      }
    }
  }