import Player from './class/Player.js';
import Fighter from './class/Fighter.js';

$(document).ready(function(){
  // ---------------------
  // Functions
  
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
  
  function setFieldClass() {
    let cells = $('.cell');
  
    // Generate 3 trees
    for (let i = 0; i < 5; i++) {
      let randIndex = Math.floor((Math.random() * (cells.length - 1)));
      let treeCell = cells.eq(randIndex);
      if(treeCell.hasClass("tree") == false && treeCell.hasClass("rock") == false) {
        treeCell.addClass("tree");
      }else {
        console.log(treeCell.classList);
      }
    }

    // Generate 2 rocks
    for (let j = 0; j < 3; j++) {
      let randIndex = Math.floor((Math.random() * (cells.length - 1)));
      let rockCell = cells.eq(randIndex);
      if(rockCell.hasClass("tree") == false && rockCell.hasClass("rock") == false) {
        rockCell.addClass("rock");
      }else {
        console.log(rockCell.classList);
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

  function createPlayer(playerName) {
    return new Player(playerName);
  }

  function createFighter(name, hp, strength){
    return new Fighter(name, hp, strength);
  }

  function insertOnePlayer(playerInfos, container) {
    let playerName = playerInfos[1];
    let imageName = playerInfos[2];
    let fighterName = playerInfos[2].replace('-l', '').replace('-r', '');

    let player = createPlayer(playerName);
    let fighter = createFighter(fighterName, 100, 50);
    player.setFighter(fighter);

    container.html(`
    <div class='fighter'>
      <div class='card'>
        <img src='./img/${imageName}.png' alt='${fighterName} picture'>
        <p class='fighter-name ${fighterName}'>${fighterName}</p>
      </div>
      <div class='infos'>
        <p class='player-name'>Player: <span>${playerName}</span></p>
        <p class='player-hp'>Life points: <span>${fighter.hp} hp</span></p>
        <p class='player-str'>Strength: <span>${fighter.strength} str</span></p>
      </div>
    </div>`);
  }

  function insertAllPlayers() {
    let players = getParams();
    let playerOneContainer = $('#p-one');
    let playerTwoContainer = $('#p-two');
    
    // console.log(players, playerOneContainer, playerTwoContainer);

    insertOnePlayer(players[0], playerOneContainer);
    insertOnePlayer(players[1], playerTwoContainer);
  }

  function createGame() {
    createArena();
    setFieldClass();
    insertAllPlayers();
  }
  
  // End Functions
  // ---------------------
  
  createGame();

  // Tests
});
  