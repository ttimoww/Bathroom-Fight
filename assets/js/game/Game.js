class Game{
  constructor(nOO, fP){
    this.numberOfObstacles = nOO;
    this.playerTurn = fP;
    this.gameMap = new Map(this.numberOfObstacles);
    this.weapons = this.initWeapons();
    this.players = this.initPlayers();
    this.gameOver = false;
    this.startGame();
  }

  // Create weapons
  initWeapons(){
    const weapons = [];
    const w1 = new Weapon(1, 'Hand', 13, 'weapon-hand');
    weapons.push(w1);
    const w2 = new Weapon(2, 'Toothbrush', 15, 'weapon-toothbrush', true);
    weapons.push(w2);
    const w3 = new Weapon(3, 'Wet Towel', 17, 'weapon-towel', true);
    weapons.push(w3);
    const w4 = new Weapon(4, 'Slippers', 19, 'weapon-slippers', true);
    weapons.push(w4);
    const w5 = new Weapon(5, 'Plunger', 22, 'weapon-plunger', true);
    weapons.push(w5);
    return weapons;
  }

  // Create players
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
  Find player object
  - parameters:
    -id: player ID
  */
  getPlayer(id){
    const player = $.grep(this.players, function(obj){return obj.playerID === id;})[0];
    return player;
  }

  /**
  Find weapon object
  - parameters:
    -id: weapon ID
  */
  getWeapon(id){
    const weapon = $.grep(this.weapons, function(obj){return obj.weaponID === id;})[0];
    return weapon;
  }

  startGame(){
    this.initTurn(this.getPlayer(this.playerTurn));
  }

  /**
  Start new turn
  - parameters:
    - player: the player object object who gets new turn
  */
  initTurn(player){
    console.log(`New turn for ${player.playerName}`);
    $(`#player${player.playerID}`).addClass('active-player');
    const that = this;
    if (this.checkForAttack(player) === true) {
      that.initAttack(player);
    }
    this.initMoves(player);
  }

  /**
  Find available moves and set eventlisteners
  - parameters:
    - player: player object
  */
  initMoves(player){
    const that = this;
    const playerID = player.playerID;
    const x = player.playerLocationX;
    const y = player.playerLocationY;
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

    /**
    Add next-move class and evenlistener
    - parameters:
      - array: array with colls
    */
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
  Move player to new location and pickup weapon if necessary
  - parameters:
      - player : player object
      - newx : new x location
      - newy : new y location
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
      console.log('has weapon');
      const weaponID = parseInt($newcol.attr('weaponid'));
      const weapon = this.getWeapon(weaponID);
      console.log(weapon);
      $newcol.removeClass(weapon.weaponClass).removeAttr('weaponid');
      player.playerWeapon.spawnWeaponFixed(newx, newy);
      player.setWeapon(weapon);
    }
    player.playerLocationX =  newx;
    player.playerLocationY =  newy;
    $newcol.attr('state', `player${player.playerID}`).append($player);
    this.clearMoves(player);

    if (this.checkForAttack(player) === true) {
      this.initAttack(player)
    }else{
      this.clearAttack(player);
    }
  }

  /**
  Remove moves of player
  - parameters:
    - player: player object
  */
  clearMoves(player){
    $('.col').removeClass(`player${player.playerID}-next`).unbind('click');
  }

  /**
  Checks if player can attack
  - returns: boolean
  - params:
    - player: player object
  */
  checkForAttack(player){
    const surroundingColls = [];
    const x = player.playerLocationX;
    const y = player.playerLocationY;
    for (var i = -1; i < 3; i+=2) {
      const $colx = $(`.col[x=${parseInt(x)+parseInt(i)}][y=${y}]`);
      const $coly = $(`.col[x=${x}][y=${parseInt(y)+parseInt(i)}]`);
      surroundingColls.push($colx, $coly);
    }
    for (var i = 0; i < surroundingColls.length; i++) {
      let $col = surroundingColls[i];
      if ($col.attr('state') === 'player1' || $col.attr('state') === 'player2') {
        return true;
      }
    }
    return false;
  }

  /**
  Sets attack & defend button
  - parameters:
    - player: the player object who can attack
  */
  initAttack(player){
    const that = this;
    if (player.playerID === 1) {
      var opponent = this.getPlayer(2);
    }else{
      var opponent = this.getPlayer(1);
    }
    //Set player state to attack because player cant be defending when attacking
    player.playerState = 'attack';
    animateButtons(`#player${player.playerID}-defend`);
    animateButtons(`#player${player.playerID}-attack`);

    $(`#player${player.playerID}-defend`).prop('disabled', false).click(function(){
      player.playerState = 'defend';
      that.clearAttack(player);
    });
    $(`#player${player.playerID}-attack`).prop('disabled', false).click(function(){
      player.attack(opponent);
      that.clearAttack(player);
    });

    //Little bounce to element in parameter
    function animateButtons(elem){
      $(elem).animate({
        'margin-bottom': '10px'
      },100, function(){
        $(this).animate({
          'margin-bottom': '0px'
        },100)
      })
    }
  }

  /**
  Clear attack and defend buttons
  - parameters:
    - player: player object whos attack has to be disabled
  */
  clearAttack(player){
    $(`#player${player.playerID}-defend`).prop('disabled', true).unbind('click');
    $(`#player${player.playerID}-attack`).prop('disabled', true).unbind('click');
    $(`#player${player.playerID}`).removeClass('active-player');
    this.clearMoves(player);
    this.checkForWin();
    if (player.playerID === 1) {
      this.initTurn(this.getPlayer(2));
    }else{
      this.initTurn(this.getPlayer(1))
    }
  }

  // Check for win
  checkForWin(){
    function initWinPage(){
      $('.game-wrapper').fadeOut(function(){
        $('.end-game-page').fadeIn();
      });
    }
    const p1 = this.getPlayer(1);
    const p2 = this.getPlayer(2);
    if (p1.playerHealth <= 0 ) {
      $('#winner-name').html(p2.playerName);
      $('.winner').addClass('player2-win');
      $('.loser').addClass('player1-loss');
      initWinPage();
    }else if (p2.playerHealth <= 0) {
      $('#winner-name').html(p1.playerName);
      $('.winner').addClass('player1-win');
      $('.loser').addClass('player2-loss');
      initWinPage();
    }
  }

}
