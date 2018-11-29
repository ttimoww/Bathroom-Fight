$(document).ready(function(){
  const waitTime = 10000;
  $('.start-game').click(function(){
    $('.landing-page').fadeOut(1000, function(){
      $('.bridge-page').fadeIn(1000, function(){
        setTimeout(function(){
          $('.bridge-page').fadeOut(1000, function(){
            window.location = 'game.html';
          })
        }, waitTime);
      });
    })
  })
});
