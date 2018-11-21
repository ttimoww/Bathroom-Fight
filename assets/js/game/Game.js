class Game{
  constructor(nOO, fP){
    this.numberOfObstacles = nOO;
    this.playerTurn = fP;
    this.gameMap = new Map(this.numberOfObstacles);
    this.weapons = this.initWeapons();
  }

  initWeapons(){
    const weapons = [];
    const w1 = new Weapon(1, 'toothbrush', 7, 'weapon-toothbrush');
    weapons.push(w1);
    const w2 = new Weapon(2, 'wet towel', 9, 'weapon-towel');
    weapons.push(w2);
    const w3 = new Weapon(3, 'slippers', 12, 'weapon-slippers');
    weapons.push(w3);
    const w4 = new Weapon(4, 'plunger', 14, 'weapon-plunger');
    weapons.push(w4);
    return weapons;
  }
}
