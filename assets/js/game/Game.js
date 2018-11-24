class Game{
  constructor(nOO, fP){
    this.numberOfObstacles = nOO;
    this.playerTurn = fP;
    this.gameMap = new Map(this.numberOfObstacles);
    this.weapons = this.initWeapons();
    this.players = this.initPlayers();
    this.gameOver = false;
    //this.initTurn();
    this.do();
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
    const p1 = new Player(1, 'Bob', hand, 5, 5);
    const p2 = new Player(2, 'Sophie', hand,  5, 7);
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
  * 5. If new col has state weapon
  *   5.1 Get weapon and weapon object
  *   5.2 Remove weapon info on col
  *   5.3 Set new weapon on Player
  * 6. Append player to new color
  * 7. Set player new location
  */
  movePlayer(player, x, y){
    const playerID = player.playerID;
    const oldx = player.playerLocationX;
    const oldy = player.playerLocationY;
    const newx = x;
    const newy = y;
    const $oldcol = $(`.col[x='${oldx}'][y='${oldy}']`);
    $oldcol.attr('state', 'empty');
    const $player = $(`#player${playerID}`).detach();
    const $newcol = $(`.col[x='${newx}'][y='${newy}']`);
    if ($newcol.attr('state') === 'weapon'){
      const weaponID = parseInt($newcol.attr('weaponid'));
      const weapon = this.getWeapon(weaponID);
      $newcol.removeClass(weapon.weaponClass).removeAttr('weaponid');
      player.setWeapon(weapon);
    }
    $newcol.attr('state', `player${playerID}`).append($player);
    player.playerLocationX =  newx;
    player.playerLocationY =  newy;

    this.clearTurn();

    // TODO: Check if fight has to start
  }

  /**
  * 1. availableMoves()
  *   1.1 Get player id and coordinates
  *   1.2 Create empty arrays
  *   1.2 For: Find colls around player and add them to arrays
  *     1.3 initColls(array)
  *     1.4 Loop over array, if col state is empty or weapon
  *     1.5 Add class and eventlistener to column
  */
  initTurn(player){
    const that = this;
    function availableMoves(pl){
      const player = pl;
      const playerID = player.playerID;
      const x = player.playerLocationX;
      const y = player.playerLocationY;
      const collsRight = [];
      const collsUp = [];
      const collsLeft = [];
      const collsDown = [];

      //Colls up & right
      for (var i = 1; i < 4; i++) {
        let $colRight = $(`.col[x=${x+i}][y=${y}]`);
        collsRight.push($colRight);
        let $colUp = $(`.col[x=${x}][y=${y+i}]`);
        collsUp.push($colUp);
        let $colLeft = $(`.col[x=${x-i}][y=${y}]`);
        collsLeft.push($colLeft);
        let $colDown = $(`.col[x=${x}][y=${y-i}]`);
        collsDown.push($colDown);
      }

      function initColls(array){
        for (var i = 0; i < array.length; i++) {
          const x = array[i].attr('x');
          const y = array[i].attr('y');
          const $col = $(`.col[x='${x}'][y='${y}']`);
          if ($col.attr('state') === 'empty' || $col.attr('state') === 'weapon'){
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
    availableMoves(player);
  }

  clearTurn(){

  }

  do(){
    this.initTurn(this.getPlayer(this.playerTurn));
  }
}
