import Weapon from './../Weapons.js';

  export default class Katana extends Weapon {
    constructor() {
      super('Katana', 10, 40, 4);

      this.name = 'Katana';
      this.apCost = 10;
      this.damages = 40;
      this.speed = 4;
    }
  }