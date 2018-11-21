class Obstacle{
  constructor(x, y, c){
    this.obstacleLocationX = x;
    this.obstacleLocationY = y;
    this.obstacleClass = c || 'obstacle';
    this.placeObstacle();
  }

  /**
  * 1. Find div based on obstacle's coordinates
  * 2. Remove .empty class
  * 3. Add obstacle's class name
  */
  placeObstacle(){
    console.log(`Placing obstacle on: (${this.obstacleLocationX}, ${this.obstacleLocationY}) With class: ${this.obstacleClass}`);
    const $col = $(`.col[x=${this.obstacleLocationX}][y=${this.obstacleLocationY}]`);
    $col.removeClass('empty').addClass(this.obstacleClass);
  }
}
