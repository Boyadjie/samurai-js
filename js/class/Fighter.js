  export default class Fighter {
    constructor(name, hp, strength) {
      this.name = name;
      this.hp = hp;
      this.strength = strength;
      this.xp = 0; // Toujours 0 au début
      this.weapon = null; // Instance de la classe Weapon
    }

    // Attaque une targets
    attack(target) {
      if (this.hp > 0) {
        const damages = this.strength;
        console.log(`${this.name} attaque ${target.name} et lui inflige ${damages} points de dégâts`);
        target.hp -= damages;
        if (target.hp > 0) {
          console.log(`${target.name} a encore ${target.hp} points de vie`);
        } else {
          target.hp = 0;
          const bonusXP = 10;
          console.log(`${this.name} a tué ${target.name} et gagne ${bonusXP} points d'expérience`);
          this.xp += bonusXP;
        }
      } else {
        console.log(`${this.name} n'a plus de points de vie et ne peut pas attaquer`);
      }
    }

    // Renvoie la description du personnage
    describe() {
      return `${this.name} a ${this.hp} points de vie, ${this.strength} en force et ${this.xp} points d'expérience`;
    }
  }