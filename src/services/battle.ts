import { v4 } from 'uuid'
import { monsters } from '../data/monsters'
import { models } from '../../typings'
import { heroes } from '../data/heroes'
import { rollForGroup, nextRound, resolveActions, checkCompletion } from './battleFunctions'



function createHero(name: string): models.server.Entity {
  const h = { ...heroes[name] }
  return { maxHp: h.baseHp, hp: h.baseHp, abilities: h.abilities, name, id: v4(), availableAction: null }
}

function createMonster(name: string): models.server.Entity {
  const h = { ...monsters[name] }
  return { maxHp: h.baseHp, hp: h.baseHp, abilities: h.abilities, name, id: v4(), availableAction: null }
}

// function createMonster(name: string, level: number): models.server.Entity {
//   const h = { ...monsters[name] }
//   return { maxHp: Math.floor(h.hpMult * level), hp: Math.floor(h.hpMult * level), abilities: h.abilities, name, id: v4(), availableAction: null }
// }

// async function submitActions(address: string, actions: models.server.Action[]): Promise<models.server.Battle> {
//   let playerDoc = await db.getPlayer(address)
//   let battleData: models.server.BattleData = playerDoc.battle[0].data
//   // init battle instance
//   let battle = BattleInstance(battleData, false)
//   battle.resolveActions('heroes', actions)
//   // save new data
//   playerDoc.battle[0] = battle.data
//   await playerDoc.save()
//   return battle
// }

function BattleData(heroes: string[], monsters: string[]): models.server.BattleData {
  return {
    round: 0,
    heroes: heroes.map((hero: string) => createHero(hero)),
    monsters: monsters.map((monster: string) => createMonster(monster)),
    actions: [],
    mainSeed: Date.now(),
    remainingRolls: 2,
    win: null
  }
}

function BattleInstance(data: models.server.BattleData, isNewBattle: boolean): models.server.Battle {
  // init
  if (isNewBattle) {
    nextRound(data)()
  }
  //return battle instance
  return {
    data,
    rollForGroup: rollForGroup(data),
    nextRound: nextRound(data),
    resolveActions: resolveActions(data)
  }
}

export const battle = {
  BattleInstance,
  BattleData
}