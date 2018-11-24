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
    this.playerInfoToPage();
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

  /**
  * 1. Set player weapon image by adding weapon class
  * 2. Set player weapon name
  * 3. Set player weapon dmg
  * 4. Set player health
  */
  playerInfoToPage(){
    $(`#player${this.playerID}-weapon-image`).addClass(`${this.playerWeapon.weaponClass}`);
    $(`#player${this.playerID}-weapon-name`).html(`${this.playerWeapon.weaponName}`);
    $(`#player${this.playerID}-weapon-damage`).html(`${this.playerWeapon.weaponDamage}`);
    $(`#player${this.playerID}-health`).css('width', `${this.playerHealth}%`);
  }

  /**
  * 1. Get weapon damage
  * 2. Get opponent state
  * 3. Deal damage (x0.5 if state is defending)
  * 4. Update opponent info by calling opponent.playerInfoToPage()
  */
  attack(opponent){
    console.log(`${this.playerName} is attacking ${opponent.playerName}`);
    const damage = this.playerWeapon.weaponDamage;
    const opponentState = opponent.playerState;
    if (opponentState === 'defend'){
      opponent.playerHealth -= (damage * 0.5);
    }else{
      opponent.playerHealth -= damage;
    }
    opponent.playerInfoToPage();
  }
}
