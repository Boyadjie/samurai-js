  export default class Weapon {
    constructor(name, apCost, damages, speed) {
      if (typeof name != "string" || Number.isInteger(apCost) == false || Number.isInteger(damages) == false) {
        throw new Error("Wrong arguments type set as parameters\n");
      }else {
        this.name = name
        this.apCost = apCost;
        this.damages = damages;
        this.speed = speed;
        this.holder = null;
      }
    }
  }