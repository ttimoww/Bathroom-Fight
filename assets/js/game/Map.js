class Map{
  constructor(nOO){
    this.generateMap();
    this.obstacles = this.generateObstacles(nOO);

  }

  /**
  * 1. Get the board container
  * 2. Generate rows
  # 3. Genereate cols inside rows (with x and y coordinates)
  * 4. Add row to board
  */
  generateMap(){
    const $board = $('.board');
    for (let i = 10; i > 0; i--) {
      const $boardRow = $('<div>');
      $boardRow.addClass('board-row');
      for (let j = 0; j < 10; j++) {
        const $col = $('<div>')
        $col.addClass('col');
        $col.attr('state', 'empty').attr('x', j+1).attr('y', i);
        $boardRow.append($col);
      }
      $board.append($boardRow);
    }
  }

  /**
  * 0. Function that generates random number between 0 and max (max cant be chosen)4
  * 1. Create empty array
  * 2. For loop as big as number of numberOfObstacles
  *    2.1 Check obstacle already exists
  *    2.1.1 Loop over all objects
  *      2.1.2 Check if parameter coordinates with one of obstacles
  *      2.1.3 If exists return true, else return false
  *    2.2 Create new obstacles
  *    2.3  Add to array
  * 3. Return array
  */
  generateObstacles(nOO){
    console.log(`Spawing: ${nOO} obstacles`);
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - 1)) + min;
    const obstacles = [];
    function obstacleExists(x, y){
      for (var i = 0; i < obstacles.length; i++) {
        if (typeof(i) != 'undefined') {
          if(obstacles[i].obstacleLocationX === x && obstacles[i].obstacleLocationY === y){
            return true;
          }
        }
      }
      return false;
    }

    for (var i = 0; i < nOO; i++) {
      let x = randomNumber(2, 9);
      let y = randomNumber(2, 9);

      if (obstacleExists(x, y) === false) {
        const o = new Obstacle(x, y);
        obstacles.push(o);
      }
    }
    return obstacles;
  }
}
