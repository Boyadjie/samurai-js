import Weapon from './../Weapons.js';

  export default class Sword2 extends Weapon {
    constructor() {
      super('Two Hand Sword', 15, 40, 6);

      this.name = 'Two Hand Sword';
      this.apCost = 15;
      this.damages = 40;
      this.speed = 6;

      this.class = 'sword2';
    }
  }