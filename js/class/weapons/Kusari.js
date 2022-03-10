  export default class Kusari extends Weapon {
    constructor() {
      this.name = 'Kusarigama';
      this.apCost = 5;
      this.damages = 15;
      this.speed = 10;

      super(this.name, this.apCost, this.damages, this.speed);
    }
  }