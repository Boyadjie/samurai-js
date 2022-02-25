  class Katana extends Weapon {
    constructor() {
      this.name = 'Katana';
      this.apCost = 10;
      this.damages = 40;
      this.speed = 4;

      super(this.name, this.apCost, this.damages, this.speed);
    }
  }