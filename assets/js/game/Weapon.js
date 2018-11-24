class Weapon{
  constructor(id, nm, dmg, cl, sp){
    this.weaponID = id;
    this.weaponName = nm;
    this.weaponDamage = dmg;
    this.weaponClass = cl;
    this.spawn = sp || false;
    this.spawnWeapon();
  }

  /*
  *     Functions that returns an random number between parameters
  *     Function that checks if col is empty
  *         Returns false if col is not empty or is spawn col
  * 1. Start while loop
  * 2. Generate random numbers
  * 3. If col is empty, add weapon to col
  * 4. Break while loop
  */
  spawnWeapon(){
    if (this.spawn === true) {
      console.log(`Spawning: ${this.weaponName}`);
      const randomNumber = (min, max) => Math.floor(Math.random() * (max - 1)) + min;
      function isColEmpty(x, y){
        const $col = $(`.col[x=${x}][y=${y}]`);
        if ($col.attr('state') !== 'empty') {
          return false;
        }else if (x === 1 && y === 10) {
          return false;
        }else if (x === 10 && y === 1) {
          return false;
        }else{
          return true;
        }
      }
      while (true) {
        let x = randomNumber(1, 10);
        let y = randomNumber(1, 10);
        if (isColEmpty(x, y) === true) {
          const $col = $(`.col[x=${x}][y=${y}]`);
          $col.attr('weaponID', this.weaponID)
          $col.attr('state', 'weapon').addClass(this.weaponClass);
          break;
        }
      }
    }
  }
}
