import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  function getEventType(event) {
    //console.log(event.type);
    if (event.code == controls.PlayerOneBlock ){
      console.log("PlayerOneBlock");
    } else if (event.code == controls.PlayerOneAttack && event.type != "keydown") {
              console.log("PlayerOneAttack");
           }
           
    if (event.code == controls.PlayerTwoBlock){
    console.log("PlayerOTwoBlock");
    } else if (event.code == controls.PlayerTwoAttack && event.type != "keydown") {
            console.log("PlayerTwoAttack");
          }
  }

  window.addEventListener('keyup', getEventType);
  window.addEventListener('keydown', getEventType);
  
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  //console.log('damage');
   return getHitPower(attacker) - getBlockPower(defender);
}

export function getHitPower(fighter) {
  let criticalHitChance = randomInteger(1, 2);
  let hitPower = fighter.attack * criticalHitChance;
  return hitPower;
}

export function getBlockPower(fighter) {
  let dodgeChance = randomInteger(1, 2);
  let power = fighter.defense * dodgeChance;
  return blockPower;
}
