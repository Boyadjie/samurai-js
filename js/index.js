$(document).ready(function(){
  // ---------------------
  // Functions

  function enableSelectFighter() {
    $('.fighter-choice div input').on('change', function() {
      // console.log($(this).is(':checked'));
      let selectedLabel = $(this).parent().children('label');
      let labels = $(this).parent().parent().children().children('label');
      // console.log(allLabels);
      if(selectedLabel.hasClass('selected')) {
        selectedLabel.removeClass('selected');
      }else {
        labels.removeClass('selected');
        selectedLabel.addClass('selected');
      }
    });
  }

  function setParams() {
    let fighters = $('.fighter-choice input:checked');
    let names = $('.params .name .gametag');

    if(fighters.length == 2 && names[0].value != '' && names[1].value != '') {
      let playerOne = {
        name: names[0].value,
        fighter: fighters[0].id
      };

      let playerTwo = {
        name: names[1].value,
        fighter: fighters[1].id
      };

      let params = [playerOne, playerTwo];

      localStorage.setItem('playersParams', JSON.stringify(params));
      return true;
    }else {
      return false;
    }
  }

  function play() {
    $('.play-btn').on('click', function() {
      if(setParams() === true) {
        setParams();
        window.location.href = "/game.html";
      }else {
        alert('You need to choose a name and a fighter !');
      }
      
    });
  }
  
  // End Functions
  // ---------------------
  enableSelectFighter();
  play();
  

  // Tests

});
  