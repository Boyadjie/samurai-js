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

  function play() {
    $('.play-btn').on('click', function() {
      let choosed = $('.fighter-choice input:checked')
      console.log(choosed);
      window.location.href = "/game.html";
    });
  }
  
  // End Functions
  // ---------------------
  enableSelectFighter();
  play();
  

  // Tests

});
  