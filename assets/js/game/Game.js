class Game{
  constructor(nOO, fP){
    this.numberOfObstacles = nOO;
    this.playerTurn = fP;
    this.gameMap = new Map(this.numberOfObstacles);
    this.weapons = this.initWeapons();
    this.players = this.initPlayers();
    this.gameOver = false;
    this.initTurn(this.getPlayer(this.playerTurn));
  }

  /**
  * 1. Create empty array
  * 2. Create weapon and add to array
  * 3. Return array
  */
  initWeapons(){
    const weapons = [];
    const w1 = new Weapon(1, 'hand', 8, 'weapon-hand');
    weapons.push(w1);
    const w2 = new Weapon(2, 'toothbrush', 10, 'weapon-toothbrush', true);
    weapons.push(w2);
    const w3 = new Weapon(3, 'wet towel', 12, 'weapon-towel', true);
    weapons.push(w3);
    const w4 = new Weapon(4, 'slippers', 14, 'weapon-slippers', true);
    weapons.push(w4);
    const w5 = new Weapon(5, 'plunger', 16, 'weapon-plunger', true);
    weapons.push(w5);
    return weapons;
  }

  /**
  * 1. Create empty array
  * 1. Get start weapon (hands)
  * 2. Create players
  * 3. Add players to array
  * 4. Return array
  */
  initPlayers(){
    const players = [];
    const hand = this.getWeapon(1);
    const p1 = new Player(1, 'Bob', hand, 1, 10);
    const p2 = new Player(2, 'Sophie', hand,  10, 1);
    players.push(p1);
    players.push(p2);
    return players;
  }

  /**
  * Finds an player object based on the players ID
  */
  getPlayer(id){
    const player = $.grep(this.players, function(obj){return obj.playerID === id;})[0];
    return player;
  }

  /**
  * Finds an weapon object based on the weapons ID
  */
  getWeapon(id){
    const weapon = $.grep(this.weapons, function(obj){return obj.weaponID === id;})[0];
    return weapon;
  }

  /**
  * 1. Get the player's ID, current postition and new position
  * 2. Get the old col & change state to empty
  * 3. Detach player
  * 4. Get new col
  * 5. If new col has weapon
  *   5.1 Get weaponID and weapon object
  *   5.2 Remove weapon info on col
  *   5.3 Drop player old weapon
  *   5.3 Set player new weapon
  * 6. Append player to new color
  * 7. Set player new location
  */
  movePlayer(player, newx, newy){
    const oldx = player.playerLocationX;
    const oldy = player.playerLocationY;
    const $oldcol = $(`.col[x='${oldx}'][y='${oldy}']`).attr('state', 'empty');
    const $player = $(`#player${player.playerID}`).detach();
    const $newcol = $(`.col[x='${newx}'][y='${newy}']`);
    // If new col has a weapon on him
    const newColWeaponAttr = $newcol.attr('weaponID');
    if (typeof newColWeaponAttr !== typeof undefined && newColWeaponAttr !== false){
      const weaponID = parseInt($newcol.attr('weaponid'));
      const weapon = this.getWeapon(weaponID);
      $newcol.removeClass(weapon.weaponClass).removeAttr('weaponid');
      player.playerWeapon.spawnWeaponFixed(newx, newy);
      player.setWeapon(weapon);
    }
    $newcol.attr('state', `player${player.playerID}`).append($player);
    console.log(`old: x: ${player.playerLocationX} - y: ${player.playerLocationY}`);
    player.playerLocationX =  newx;
    player.playerLocationY =  newy;
    console.log(`new: x: ${player.playerLocationX} - y: ${player.playerLocationY}`);
    this.clearTurn(player);

    // TODO: Check if fight has to start
  }

  /**
  * 1. Get player id and coordinates
  * 2. Create empty arrays
  * 3. For: Find colls around player and add them to arrays
  * 4. initCols(array)
  *   4.1. Loop over array, if col state is empty or weapon
  *   4.2. Add class and eventlistener to column
  */
  initTurn(player){
    console.log(`Initalizing turn of player ${player.playerName}`);
    const that = this;
    const playerID = player.playerID;
    const x = player.playerLocationX;
    const y = player.playerLocationY;
    console.log(`find available moves for ${player.playerName} from x:${x} y:${y}`);
    let collsRight = [];
    let collsUp = [];
    let collsLeft = [];
    let collsDown = [];

    //Colls up & right
    for (var i = 1; i < 4; i++) {
      let $colRight = $(`.col[x=${parseInt(x)+parseInt(i)}][y=${y}]`);
      collsRight.push($colRight);

      let $colUp = $(`.col[x=${x}][y=${parseInt(y)+parseInt(i)}]`);
      collsUp.push($colUp);

      let $colLeft = $(`.col[x=${parseInt(x)-parseInt(i)}][y=${y}]`);
      collsLeft.push($colLeft);

      let $colDown = $(`.col[x=${x}][y=${parseInt(y)-parseInt(i)}]`);
      collsDown.push($colDown);
    }

    function initColls(array){
      for (var i = 0; i < array.length; i++) {
        const x = array[i].attr('x');
        const y = array[i].attr('y');
        const $col = $(`.col[x='${x}'][y='${y}']`);
        if ($col.attr('state') === 'empty'){
          $col.addClass(`player${playerID}-next`).click(function(){
            const x = $(this).attr('x');
            const y = $(this).attr('y');
            that.movePlayer(player, x, y);
          });
        }else{
          break;
        }
      }
    }
    initColls(collsRight);
    initColls(collsUp);
    initColls(collsLeft);
    initColls(collsDown);
  }

  /**
  * 1. Remove player-next classes
  * 2. Remove event handlers
  * 3. Change playerTurn
  * 4. init new Turn
  */
  clearTurn(pl){
    console.log(`Clearing turn of player ${pl.playerName}`);
    $('.col').removeClass(`player${pl.playerID}-next`).unbind('click');
    if (this.playerTurn === 1){
      this.playerTurn = 2;
    }else {
      this.playerTurn = 1;
    }
    this.initTurn(this.getPlayer(this.playerTurn));
  }
}
