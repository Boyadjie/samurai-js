  import Weapon from './Weapons.js'

  export default class Fighter {
    constructor(name, hp, strength) {
      this.name = name;
      this.hp = hp;
      this.strength = strength;
      this.ap = 100;
      this.xp = 0; // Toujours 0 au début
      this.weapon = null; // Instance de la classe Weapon
    }

    // Set
    setWeapon(weapon) {
      if(typeof weapon === 'object' && weapon !== null && weapon instanceof Weapon) {
        this.weapon = weapon;
        console.log(`${this.name} take the ${weapon.name} !\n`);
      }else {
        throw new Error("This isn't an Weapon\n");
      }
    }

    setPosition(position) {
      if(typeof position == 'number' && position >= 0 && position <= 80) {
        this.position = position;
      }else {
        throw new Error("This isn't an valid position\n");
      }
    }

    // Methods
    attack(target) {
      if (this.hp > 0) {
        if (this.weapon != null) {
          const damages = this.strength + this.weapon.damages;
          console.log(`${this.name} attack ${target.name} with a ${this.weapon.name}. +${damages} damages are recieved.\n`);
          this.ap -= this.weapon.apCost;
          target.hp -= damages;
        }else {
          const damages = this.strength;
          console.log(`${this.name} attack ${target.name}. +${damages} damages are recieved.\n`);
          target.hp -= damages;
        }
        if (target.hp > 0) {
          console.log(`${target.name} have ${target.hp} hp left.\n`);
        } else {
          target.hp = 0;
          const bonusXP = 10;
          console.log(`${this.name} killed ${target.name} ! +${bonusXP} xp.\n`);
          this.xp += bonusXP;
        }
      } else {
        console.log(`${this.name} is dead, he cant attack.\n`);
      }
    }

    // Renvoie la description du personnage
    describe() {
      return `${this.name} have ${this.hp} health point, a strength of ${this.strength} and ${this.xp} xp.\n`;
    }
  }