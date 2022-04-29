import Weapon from './../Weapons.js';

  export default class Kusari extends Weapon {
    constructor() {
      super('Kusarigama', 5, 15, 10);

      this.name = 'Kusarigama';
      this.apCost = 5;
      this.damages = 15;
      this.speed = 10;

      this.class = 'kusari';
    }
  }