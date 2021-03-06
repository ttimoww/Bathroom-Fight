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
  *         Returns false if col is not empty, has a weapon on it or is spawn col
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
        const colWeaponAttr = $col.attr('weaponID');
        if ($col.attr('state') !== 'empty') {
          return false;
        }else if (typeof colWeaponAttr !== typeof undefined && colWeaponAttr !== false){
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
        let x = randomNumber(3, 6);
        let y = randomNumber(3, 6); //1 10
        if (isColEmpty(x, y) === true) {
          const $col = $(`.col[x=${x}][y=${y}]`);
          $col.attr('weaponID', this.weaponID).addClass(this.weaponClass);
          break;
        }
      }
    }
  }

  /*
  * 1. Get the col
  * 2. Add attributes and class
  */
  spawnWeaponFixed(x, y){
    const $col = $(`.col[x=${x}][y=${y}]`);
    $col.attr('weaponID', this.weaponID).attr('state', 'weapon').addClass(this.weaponClass);
  }
}
