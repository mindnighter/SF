import { controls } from '../../constants/controls';
import {showWinnerModal} from './modal/winner';
export async function fight(firstFighter, secondFighter) {

  firstFighter.position = 'left';
  secondFighter.position = 'right';

  firstFighter.decrement = 100/firstFighter.health;
  secondFighter.decrement = 100/secondFighter.health;

  firstFighter.health= 100;
  secondFighter.health= 100;

  firstFighter.intervalCritHit= true;
  secondFighter.intervalCritHit= true;

  let firstFighterKey;
  let secondFighterKey;


  function getEventType(event) {

     if (event.code == controls.PlayerOneBlock && event.type == "keydown") {
      firstFighterKey = "PlayerOneBlock"
    }
     if (event.code == controls.PlayerTwoBlock  && event.type == "keydown") {
      secondFighterKey = "PlayerTwoBlock"
    }

    
    if (event.code == controls.PlayerOneBlock && event.type == "keyup") {
      firstFighterKey = false;
    }
    if (event.code == controls.PlayerTwoBlock  && event.type == "keyup") {
      secondFighterKey = false;
    }

    if (event.code == controls.PlayerOneAttack) {
      firstFighterKey = "PlayerOneAttack"
      if (secondFighterKey == "PlayerTwoBlock"  && event.type == "keyup") {
        secondFighter.health = secondFighter.health-secondFighter.decrement 
                * getDamage( firstFighter, secondFighter, true);
              
                document.getElementById(`${secondFighter.position}-fighter-indicator`).style.width
                = `${secondFighter.health}%`;
        
      } else if (event.type == "keyup"){
        secondFighter.health = secondFighter.health-secondFighter.decrement 
        * getDamage( firstFighter, secondFighter, false);

        document.getElementById(`${secondFighter.position}-fighter-indicator`).style.width
        = `${secondFighter.health}%`;
      }
    } 

    if (event.code == controls.PlayerTwoAttack) {
      secondFighterKey = "PlayerTwoAttack"
      if (firstFighterKey == "PlayerOneBlock" && event.type == "keyup") {
        firstFighter.health =  firstFighter.health-firstFighter.decrement
                * getDamage( secondFighter, firstFighter, true);
                document.getElementById(`${firstFighter.position}-fighter-indicator`).style.width
                = `${firstFighter.health}%`;
      } else if(event.type == "keyup") {
        firstFighter.health =  firstFighter.health-firstFighter.decrement
                * getDamage( secondFighter, firstFighter, false);

                document.getElementById(`${firstFighter.position}-fighter-indicator`).style.width
                = `${firstFighter.health}%`;
      }
    }
    
  }

  window.addEventListener('keyup', getEventType);
  window.addEventListener('keydown', getEventType);



  function  PlayerCriticalHit(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();

      func();
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });

  }
  function Criticalhit(attacker, defender){
    if(attacker.intervalCritHit){
      defender.health = defender.health-defender.decrement
      * 2 * attacker.attack;

      document.getElementById(`${defender.position}-fighter-indicator`).style.width
      = `${defender.health}%`;
      attacker.intervalCritHit = false;
      setInterval( function() { attacker.intervalCritHit = true; }, 10000);

    }
  }
  PlayerCriticalHit(
    () => Criticalhit(firstFighter,secondFighter),
     ...controls.PlayerOneCriticalHitCombination
    
  );

  PlayerCriticalHit(
    () => Criticalhit(secondFighter,firstFighter), 
    ...controls.PlayerTwoCriticalHitCombination
    
  );

  return new Promise((resolve) => {
    setInterval(() => {
      if(firstFighter.health < 0){
        showWinnerModal(secondFighter);
        resolve(secondFighter);
      }
      if(secondFighter.health < 0){
        showWinnerModal(firstFighter);
        resolve(firstFighter);
      }
    }, 100);
  });
}

export function getDamage(attacker, defender, defenderBlock) {
  if(defenderBlock){
    let Block = getHitPower(attacker) - getBlockPower(defender);
   if( 0 >  Block ){
    return 0;
   } else{
    return  Block;
   }
  } else{
    return getHitPower(attacker)
  }
}

export function getHitPower(fighter) {
  let criticalHitChance = randomInteger(1, 2);
  let hitPower = fighter.attack * criticalHitChance;
  return hitPower;
}

export function getBlockPower(fighter) {
  let dodgeChance = randomInteger(1, 2);
  let dodge = fighter.defense * dodgeChance;
  return dodge;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}