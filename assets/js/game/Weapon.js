class Weapon{
  constructor(id, nm, dmg, cl){
    this.weaponID = id;
    this.weaponName = nm;
    this.weaponDamage = dmg;
    this.weaponClass = cl;
    this.spawnWeapon();
  }

  /*
  * 0. Functions that returns an random number between parameters
  * 0.1. Function that checks if col is empty
  * 0.2 Returns true if empty or is not spawn col
  * 1. Start while loop
  * 2. Generate random numbers
  * 3. If col is empty, add weapon to col
  * 4. Break while loop
  */
  spawnWeapon(){
    console.log(`Spawning: ${this.weaponName}`);
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - 1)) + min;
    function isColEmpty(x, y){
      const $col = $(`.col[x=${x}][y=${y}]`);
      if ($col.hasClass('empty') || x === 10 && y ===  10 || x === 0 && y ===  0 ) {
        return true;
      }
      return false;
    }

    while (true) {
      let x = randomNumber(1, 10);
      let y = randomNumber(1, 10);
      if (isColEmpty(x, y) === true) {
        const $col = $(`.col[x=${x}][y=${y}]`);
        $col.removeClass('empty').addClass(this.weaponClass);
        break;
      }
    }
  }
}
