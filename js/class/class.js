import Player from './partials/Player';
import Fighter from './partials/Fighter';
import Weapon from './partials/Weapons';

import Katana from './partials/weapons/Katana';
import Kusari from './partials/weapons/Kusari';
import Sword1 from './partials/weapons/Sword1';
import Sword2 from './partials/weapons/Sword2';
import { getNameTag } from '../functions';


// let playerOneName = getNameTag('ame-one');

$('.play-btn').on('click', function () {
  getNameTag('ame-one');
});


// let player_one = new Player('Player One');
// let player_two = new Player('Player Two');