  class Sword2 extends Weapon {
    constructor() {
      this.name = 'Two Hand Sword';
      this.apCost = 15;
      this.damages = 40;
      this.speed = 6;

      super(this.name, this.apCost, this.damages, this.speed);
    }
  }