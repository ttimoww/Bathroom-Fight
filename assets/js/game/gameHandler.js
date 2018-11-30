// Game variables
const numberOfObstacles = 30;
const firstPlayer = 1;

$(document).ready(function(){
  console.log('Start game!');
  const game1 = new Game(numberOfObstacles, firstPlayer);
})
