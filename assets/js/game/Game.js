class Game{
  constructor(nOO, fP){
    this.numberOfObstacles = nOO;
    this.playerTurn = fP;
    this.gameMap = new Map(this.numberOfObstacles);
    this.weapons = this.initWeapons();
    this.players = this.initPlayers();
  }

  /**
  * 1. Create empty array
  * 2. Create weapon and add to array
  * 3. Return array
  */
  initWeapons(){
    const weapons = [];
    const w1 = new Weapon(1, 'hand', 6, 'weapon-hand');
    weapons.push(w1);
    const w2 = new Weapon(2, 'toothbrush', 7, 'weapon-toothbrush', true);
    weapons.push(w2);
    const w3 = new Weapon(3, 'wet towel', 9, 'weapon-towel', true);
    weapons.push(w3);
    const w4 = new Weapon(4, 'slippers', 12, 'weapon-slippers', true);
    weapons.push(w4);
    const w5 = new Weapon(5, 'plunger', 14, 'weapon-plunger', true);
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

  // TODO: movePlayer(){}

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
}
