  export default class Sword1 extends Weapon {
    constructor() {
      this.name = 'One Hand Sword';
      this.apCost = 5;
      this.damages = 20;
      this.speed = 8;

      super(this.name, this.apCost, this.damages, this.speed);
    }
  }