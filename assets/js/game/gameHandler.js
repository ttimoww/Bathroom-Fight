// Game variables
const numberOfObstacles = 20;
const firstPlayer = 1;

$(document).ready(function(){
  console.log('gameHandler: Ready to Go');
  const game1 = new Game(numberOfObstacles, firstPlayer);
})
