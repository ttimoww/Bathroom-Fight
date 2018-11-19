$(document).ready(function(){
  const waitTime = 1000;
  $('.start-game').click(function(){
    $('.landing-page').fadeOut(1000, function(){
      $('.bridge-page').fadeIn(1000, function(){
        setTimeout(function(){

          $('.bridge-page').fadeOut(waitTime, function(){
            window.location = 'game.html';
          })

        }, 1000);
      });
    })
  })
});
