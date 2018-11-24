class Player{
  constructor(pID, pN, pW, pLX, pLY, pS, pH){
    this.playerID = pID;
    this.playerName = pN;
    this.playerWeapon = pW;
    this.playerLocationX = pLX;
    this.playerLocationY= pLY;
    this.playerState = pS || 'attack';
    this.playerHealth = pH || 100;
    this.spawnPlayer();
  }

/**
* 1. Get col where player has to be spawned.
* 2. Create div with player class
* 3. Change col state
* 3. Add player div to column
*/
  spawnPlayer(){
    console.log(`Spawing: player${this.playerID}`);
    const $spawnCol = $(`.col[x='${this.playerLocationX}'][y='${this.playerLocationY}']`);
    const $player = $(`<div id='player${this.playerID}'>`);
    $spawnCol.attr('state', `player${this.playerID}`);
    $spawnCol.append($player);
  }
}
