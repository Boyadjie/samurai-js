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
    for (let i = 0; i < 3; i++) {
      let randIndex = Math.floor((Math.random() * (cells.length - 1)));
      let treeCell = cells.eq(randIndex);
      if(treeCell.hasClass("tree") == false && treeCell.hasClass("rock") == false) {
        treeCell.addClass("tree");
      }else {
        console.log(treeCell.classList);
      }
    }

    // Generate 2 rocks
    for (let j = 0; j < 2; j++) {
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

  function insertOnePlayer(player, container) {
    let playerName = player[1];
    let imageName = player[2];
    let fighterName = player[2].replace('-l', '').replace('-r', '');
    container.html(`
    <div class='fighter'>
      <div class=''>
        <img src='./img/${imageName}.png' alt='${fighterName} picture'>
        <p class'fighter-name'>${fighterName}</p>
      <div>
      <div class='infos'>
        <p class'player-name'>${playerName}</p>
      </div>
    </div>`);
  }

  function insertAllPlayers() {
    let players = getParams();
    let playerOneContainer = $('#p-one');
    let playerTwoContainer = $('#p-two');
    
    console.log(players, playerOneContainer, playerTwoContainer);

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
  