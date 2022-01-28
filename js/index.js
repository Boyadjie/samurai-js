  // ---------------------
  // Functions

  function createArena(container) {
    let arena = "";
    for (let i = 0; i < 9; i++) {
      let row = `<div class="row">`;
      for (let j = 0; j < 9; j++) {
        row += `<div class="cell"></div>`;
      }
      row += `</div>`;
      arena += row;
    }
    container.html(arena);
  }

  // End Functions
  // ---------------------


  let arenaContainer = $('#gameArea');
  console.log(arenaContainer);
  createArena(arenaContainer);