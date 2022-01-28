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
  
  function atributeRandomClass() {
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
    
    // console.log(cells);
  }
  
  // End Functions
  // ---------------------
  
  createArena();
  atributeRandomClass();

});
  