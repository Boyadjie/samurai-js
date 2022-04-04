import Player from './class/Player.js';
import Fighter from './class/Fighter.js';
import Katana from './class/weapons/Katana.js';
import Kusari from './class/weapons/Kusari.js';
import Sword1 from './class/weapons/Sword1.js';
import Sword2 from './class/weapons/Sword2.js';
import Weapon from './class/Weapons.js';

$(document).ready(function(){
  // ----------------------------------------------------------------------------------------------------------------------------------
  // Functions

  // Global ---------------------------------------------------------------------------------------
  function checkPosition(first, second, array) {
    // second need to be different from : first, first-9, first+9, first-1, first+1...
    let deadZone = [first, first-1, first-8, first-9, first-10, first+1, first+8, first+9, first+10];

    for(let i = 0; i < deadZone.length; i++) {
      let cell = deadZone[i];
      if(cell == second) {
        second = Math.floor((Math.random() * (array.length - 1)));
        checkPosition(first, second, array);
      }
    }
    
    return [first, second];
  }

  function checkClass(element) {
    if(element.hasClass("tree") == false && element.hasClass("rock") == false && element.hasClass("fighter") == false && element.hasClass("weapon") == false) {
      return element
    }else {
      return false;
    }
  }

  function checkCellIndex(cells) {
    let randIndex = Math.floor((Math.random() * (cells.length - 1)));
    let cell = cells.eq(randIndex);

    while(checkClass(cell) == false) {
      randIndex = Math.floor((Math.random() * (cells.length - 1)));
      cell = cells.eq(randIndex);
    }

    return randIndex;
  }

  function getParams() {
    if(localStorage.getItem('playersParams') == undefined) {
      window.location.href = "index.html";
    }else {
      let params = JSON.parse(localStorage.getItem('playersParams'));

      let playerOne = ['player1', params[0].name, params[0].fighter];
      let playerTwo = ['player2', params[1].name, params[1].fighter];

      return [playerOne, playerTwo];
    }
  }

  // Create ---------------------------------------------------------------------------------------
  function createArena() {
    let arena = "";
    for (let i = 0; i < 9; i++) {
      let row = `<div class="row">`;
      for (let j = 0; j < 9; j++) {
        row += `<div class="cell"></div>`;
      }
      row += `</div>`;
      arena += row;
    }
    $('#gameArea').html(arena);
  }

  function createPlayer(playerName, side) {
    return new Player(playerName, side);
  }

  function createFighter(name, hp, strength){
    return new Fighter(name, hp, strength);
  }

  function createWeapons() {
    let weapons = {
      katana: new Katana(),
      kusari: new Kusari(),
      sword1: new Sword1(),
      sword2: new Sword2()
    };

    return weapons;
  }

  // Insert ---------------------------------------------------------------------------------------
  function insertOnePlayer(playerInfos, container) {
    let playerName = playerInfos[1];
    let imageName = playerInfos[2];
    let fighterName = playerInfos[2].replace('-l', '').replace('-r', '');
    let side = playerInfos[2].replace('noukon-', '').replace('akai-', '');

    let player = createPlayer(playerName, side);
    let fighter = createFighter(fighterName, 100, 50);

    player.setFighter(fighter);

    container.html(`
    <div class='fighter-infos'>
      <div class='card'>
        <img src='./img/fighters/${imageName}.png' alt='${fighterName} picture'>
        <p class='fighter-name ${fighterName}'>${fighterName}</p>
      </div>
      <div class='infos'>
        <p class='player-name'>Player: <span>${playerName}</span></p>
        <p class='player-hp'>Life points: <span>${fighter.hp} hp</span></p>
        <p class='player-str'>Strength: <span>${fighter.strength} str</span></p>
      </div>
    </div>`);

    return player;
  }

  function insertAllPlayers() {
    let players = getParams();
    let playerOneContainer = $('#p-one');
    let playerTwoContainer = $('#p-two');

    let playerOne = insertOnePlayer(players[0], playerOneContainer);
    let playerTwo = insertOnePlayer(players[1], playerTwoContainer);

    return [playerOne, playerTwo];
  }

  // Set ---------------------------------------------------------------------------------------
  function setFieldClass() {
    let cells = $('.cell');
  
    // Generate 5 trees
    for (let i = 0; i < 5; i++) {
      let randIndex = Math.floor((Math.random() * (cells.length - 1)));
      let treeCell = cells.eq(randIndex);
      if(treeCell.hasClass("tree") == false && treeCell.hasClass("rock") == false) {
        treeCell.addClass("tree");
      }
    }

    // Generate 3 rocks
    for (let j = 0; j < 3; j++) {
      let randIndex = Math.floor((Math.random() * (cells.length - 1)));
      let rockCell = cells.eq(randIndex);
      if(rockCell.hasClass("tree") == false && rockCell.hasClass("rock") == false) {
        rockCell.addClass("rock");
      }
    }

    // Generate ground cell where they not contain any other class than cell
    for (let k = 0; k < cells.length; k++) {
      const cell = cells.eq(k);
      if(cell.hasClass("tree") == false && cell.hasClass("rock") == false) {
        cell.addClass("floor");
      }
    }
  }

  function setFightersOnField(players) {
    let cells = $('.cell');
    let index = [];

    // get 2 random index
    for (let i = 0; i < 2; i++) {
      let randIndex = checkCellIndex(cells);
      index.push(randIndex);
    }

    let positions = checkPosition(index[0], index[1], cells);
    for (let i = 0; i < positions.length; i++) {
      let position = positions[i];
      let fighterCell = jQuery(cells.eq(position)[0]);
      let fighterImgClass = `${players[i].fighter.name}-${players[i].side}`;

      fighterCell.addClass(`fighter ${fighterImgClass}`);
    }
  }

  function setWeaponsOnField() {
    let weapons = createWeapons();
    let cells = $('.cell');
    let weaponsParams = [];

    for(const e of Object.entries(weapons)) {
      let params = [];
      let cellIndex = checkCellIndex(cells);
      let weaponCell = jQuery(cells.eq(cellIndex));
      let weaponClass = e[0];

      weaponCell.addClass(`weapon ${weaponClass}`);
      params['id'] = cellIndex;
      params['title'] = weaponClass;
      params['obj'] = e[1];

      weaponsParams.push(params);
    };

    return weaponsParams;
  }

  // Game generation ---------------------------------------------------------------------------------------
  function createGame() {
    createArena();
    setFieldClass();

    let players = insertAllPlayers();
    setFightersOnField(players);
    let weapons = setWeaponsOnField();
  }
  
  // End Functions
  // -----------------------------------------------------------------------------------------------------------------------------------
  
  createGame();
});
  