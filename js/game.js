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
      return element;
    }else {
      return false;
    }
  }

  function checkObstacles(element) {
    if(element.hasClass("tree") == false && element.hasClass("rock") == false) {
      return element;
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

  function getObstaclesIds() {
    let cells = $('.cell');

    let rocks = $('.rock');
    let trees = $('.tree');
    let obstacles = [];
    let ids = [];

    for(const tree of trees) {
      obstacles.push(tree);
    }
    for(const rock of rocks) {
      obstacles.push(rock);
    }

    for(const obstacle of obstacles) {
      // console.log(obstacle);
      let obId;
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if(cell == obstacle){
          obId = i;
        }
      }
      ids.push(obId);
    }

    return ids;
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
  function insertIds() {
    let cells = $('.cell');

    for (let i = 0; i < cells.length; i++) {
      const e = jQuery(cells[i]);
      e.attr('id', i);
    }
  }

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

    // Add ids to cells
    insertIds();
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

      players[i].fighter.setPosition(position);

      fighterCell.addClass(`fighter ${fighterImgClass}`);
    }
  }

  function setWeaponsOnField() {
    let weapons = createWeapons();
    let cells = $('.cell');
    let weaponsParams = [];

    for(const weapon of Object.entries(weapons)) {
      let cellIndex = checkCellIndex(cells);
      let weaponCell = jQuery(cells.eq(cellIndex));
      let weaponClass = weapon[0];

      weaponCell.addClass(`weapon ${weaponClass}`);
      weapon[1].setPosition(cellIndex);

      weaponsParams[weaponClass] = weapon[1];
    };

    return weaponsParams;
  }

  function setObstaclesDeadzone() {
    let cells = $('.cell');
    let obIds = getObstaclesIds();

    for(let obId of obIds) {
      let deadZone = [jQuery(cells.eq(obId-1)),jQuery(cells.eq(obId+1)),jQuery(cells.eq(obId-9)),jQuery(cells.eq(obId+9))]

      for(const deadCell of deadZone) {
        if(deadCell.hasClass('toMove')) {
          deadZone.forEach((e) => {
            e.removeClass('go-to');
          });
        }
      }
    }
  }

  // Movement ---------------------------------------------------------------------------------------
  function moveToParams(position) {
    let moveTo = [];
    moveTo['top'] = [position+9, position+18];
    moveTo['bottom'] = [position-9, position-18];
    moveTo['right'] = [position+1, position+2];
    moveTo['left'] = [position-1, position-2];

    return moveTo;
  }

  function getMovePositions(position) {
    let moveTo = moveToParams(position);
    let positions = [];

    // side ---
    let line = ((position)/9);
    let maxLine = Math.trunc(((position)/9))+1;
    let minLine = Math.trunc(line);

    let moveSide = [moveTo['left'][0],moveTo['left'][1],moveTo['right'][0],moveTo['right'][1]];

    for(const side of moveSide) {
      if(((side)/9) < maxLine && ((side)/9) >= minLine) {
        positions.push(side);
      }
    }

    // top & bottom
    let collumn = (((position)%9)+1);
    let moveTopBottom = [moveTo['top'][0],moveTo['top'][1],moveTo['bottom'][0],moveTo['bottom'][1]];

    for(const topBot of moveTopBottom) {
      if(((topBot)/9) < 80 && ((topBot)/9) >= 0) {
        positions.push(topBot);
      }
    }

    return positions;
  }

  // function showMovements(player) {
  //   let cells = $('.cell');
  //   let fighter = player.fighter;
  //   let fighterCell = jQuery(cells.eq(fighter.position));

  //   let movePositions = getMovePositions(fighter.position);
  //   let moveCells = [];

  //   for(const position of movePositions) {
  //     moveCells.push(jQuery(cells.eq(position)));
  //   }

  //   fighterCell.on('click', (e) => {
  //     const myPlayer = jQuery(e.currentTarget);

  //     if(myPlayer.hasClass('move')) {
  //       myPlayer.removeClass('move');
  //       moveCells.forEach((e) => {
  //         e.removeClass('go-to');
  //       });
  //     }else {
  //       myPlayer.addClass('move');
  //       moveCells.forEach((e) => {
  //         if(checkObstacles(e) != false) {
  //           e.addClass('go-to');
  //           setObstaclesDeadzone();
  //         }
  //       });
  //     }
  //   });

  //   return moveCells;
  // }

  // function moveDetails(e, fighter, fighterCell, fighterImgClass, area) {
  //   e = jQuery(e[0]);
  //   e.addClass(`fighter ${fighterImgClass}`);
  //   fighterCell.removeClass(`fighter ${fighterImgClass} move`);
  //   fighter.setPosition(parseInt(e[0].id));

  //   area.forEach((a) => {
  //     a.removeClass('go-to');
  //   });

  //   e.off('click');
  //   return true;
  // }

  // function move(player1, player2, toPlay) {
  //   let cells = $('.cell');
  //   let fighter = toPlay.fighter;
  //   let fighterCell = jQuery(cells.eq(fighter.position));
  //   let fighterImgClass = `${fighter.name}-${toPlay.side}`;
  //   let area = showMovements(toPlay);

  //   console.log(area);

  //   if(toPlay == player1) {
  //     for(const cell of area) {
  //       cell.on('click', moveDetails(cell, fighter, fighterCell, fighterImgClass, area));
  //     }
  //     round(player1, player2, player2);
  //   }else {
  //     for(const cell of area) {
  //       cell.on('click', moveDetails(cell, fighter, fighterCell, fighterImgClass, area));
  //     }
  //     round(player1, player2, player1);
  //   }
  // }

  function showMovementsPossibility(currentPosition, fighterCell) {
    let cells = $('.cell');
    let movePositions = getMovePositions(currentPosition);
    let moveCells = [];

    for(const position of movePositions) {
      moveCells.push(jQuery(cells.eq(position)));
    }

    if(fighterCell.hasClass('toMove')) {
      moveCells.forEach((e) => {
        if(checkObstacles(e) != false) {
          e.addClass('go-to');
          setObstaclesDeadzone();
        }
      });
      fighterCell.removeClass('toMove');
    }else {
      return false;
    }

    return moveCells;
  }

  function getMovementsPossibilities(fighterCell) {
    fighterCell.on('click', (cell) => {
      cell = jQuery(cell.currentTarget);
      cell.off();

      let currentPosition = parseInt(cell.attr('id'));
      let possibilities = showMovementsPossibility(currentPosition, cell);

      // console.log(possibilities); // affiche bien les possibilités
      return possibilities;
    });
  }

  // function getTarget(possibilities) {
  //   for(const target of possibilities) {
  //     target.on('click', (target) => {
  //       target = jQuery(target);
  //       target.off();

  //       return target;
  //     });
  //   }
  // }

  function move(fighter) {
    let cells = $('.cell');
    let fighterCell = jQuery(cells.eq(fighter.position));
    let target;

    fighterCell.addClass('toMove');

    let possibilities = getMovementsPossibilities(fighterCell);
    console.log(possibilities); // n'affiche pas les possibilités --> undefined

    // target = getTarget(possibilities);

  }

  // Rounds ---------------------------------------------------------------------------------------
  function getPlayerToPlay(round) {
    let playerId = round % 2;

		if (playerId == 0) {
			playerId = 2;
    }

    // roundNb -> playerId (désiré)      roundNb  %  2 = Result
		//    1    ->    1                      1     %  2 =   1     
    //    2    ->    2                      2     %  2 =   0     
    //    3    ->    1                      3     %  2 =   1     
		//    4    ->    2                      4     %  2 =   0     
		//    5    ->    1                      5     %  2 =   1     
		//    6    ->    2                      6     %  2 =   0 

		return playerId;
  }

  function gameLoop(round, players) {
    round++;
    let player1 = players[0];
    let player2 = players[1];

    let toPlay = getPlayerToPlay(round);
    toPlay = `player${toPlay}`;
    
    if(toPlay === 'player1'){
      toPlay = player1;
    }else {
      toPlay = player2;
    }

    let fighter = toPlay.fighter;
    move(fighter);

    let test = $('.fighter');
    test.on('click', (e) => {
      test.off();
      gameLoop(round, players);
    });
  }


  // Game generation ---------------------------------------------------------------------------------------
  function createGame() {
    createArena();
    setFieldClass();

    let players = insertAllPlayers();
    setFightersOnField(players);

    let weapons = setWeaponsOnField();

    let round = 0;
    gameLoop(round, players);
    // round(playerOne, playerTwo, playerOne);
  }
  
  // End Functions
  // -----------------------------------------------------------------------------------------------------------------------------------
  
  createGame();
});
  