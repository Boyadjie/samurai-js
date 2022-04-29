import Weapon from './../Weapons.js';

  export default class Sword1 extends Weapon {
    constructor() {
      super('One Hand Sword', 5, 20, 8);

      this.name = 'One Hand Sword';
      this.apCost = 5;
      this.damages = 20;
      this.speed = 8;

      this.class = 'sword1';
    }
  }