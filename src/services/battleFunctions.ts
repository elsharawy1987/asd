import { models } from "../../typings"
import { ai } from './ai'

const seedrandom = require('seedrandom')

function getRandomArbitrary(seed: number, min: number, max: number): number {
  console.log('rolling')
  min = Math.ceil(min)
  max = Math.floor(max)
  const rng = seedrandom((seed + Math.random()) / 2)
  return Math.floor(rng() * (max - min) + min)
  // return 0
}

function isDead(entity: models.server.Entity): boolean {
  return entity.hp <= 0
}

export function rollForGroup(data: models.server.BattleData) {
  console.log('roll')
  return function (group: 'heroes' | 'monsters', chosenIndexes: number[]) {
    console.log('rolling RANDOM for ', group)
    if (!data.remainingRolls) {
      return
    }
    data[group].forEach((e: models.server.Entity, index: number) => {
      e.availableAction = !chosenIndexes.includes(index) ? getRandomArbitrary(data.mainSeed, 0, 6) : e.availableAction
      if (group === 'monsters') {
        let action = e.abilities[e.availableAction]
        e.toIndex = !action?.hostile ? ai.chooseHealTarget(data.monsters) : ai.chooseAttackTarget(data.heroes)
      }
    })
    group === 'heroes' ? data.remainingRolls-- : data.remainingRolls
  }
}

export function nextRound(data: models.server.BattleData) {
  return function () {
    if (data.win !== null) {
      return
    }
    console.log('firing up round ', data.round + 1)
    data.remainingRolls = 3
    rollForGroup(data)('monsters', [])
    rollForGroup(data)('heroes', [])
    data.round++
  }
}

export function resolveActions(data: models.server.BattleData) {
  return function (casterGroup: 'heroes' | 'monsters', actions: models.server.Action[] | undefined) {
    console.log(casterGroup)
    if (data.win === null) {
      actions = casterGroup === 'monsters' ?
        data.monsters.map((monster: models.server.Entity) => ({ toIndex: monster.toIndex })) :
        actions
      console.log('resolving actions for ', casterGroup)
      // if (actions.length !== data[casterGroup].length) {
      //   console.log('actions missing')
      // }
      for (let index = 0; index < actions.length; index++) {
        // target index
        const { toIndex } = actions[index]
        // target null | undefined
        if (toIndex == null) continue
        // FROM
        let fromEntity = data[casterGroup][index]
        // check caster is dead
        if (isDead(fromEntity)) continue
        // TO
        let toEntity = data[casterGroup === 'heroes' ? 'monsters' : 'heroes'][toIndex]
        // action reference
        let action = fromEntity.abilities[fromEntity.availableAction]
        // null side
        if (action === null) continue
        // action cases
        switch (action.name) {
          // ATTACK
          case 'attack':
            // check target attack is dead
            if (isDead(toEntity)) break
            // compute damage
            let tempShield = toEntity.conditions.temporary.shield
            // permanent shield
            let permaShield = toEntity.conditions.permanent.shield
            toEntity.hp = toEntity.hp - action.damage
            console.log(`${fromEntity.name} attacking ${toEntity.name}`)
            break
          // HEAL
          case 'heal':
            toEntity = data[casterGroup][toIndex]
            // check target heal is dead
            if (isDead(toEntity)) {
              console.log(10)

              console.log(`target ${toEntity.name} is dead`)
              console.log(11)

              break
            }
            toEntity.hp += action.damage
            toEntity.hp = toEntity.hp > toEntity.maxHp ? toEntity.maxHp : toEntity.hp
            console.log(12)

            console.log(`${fromEntity.name} healing ${toEntity.name}`)
            console.log(13)

            break
        }
      }
      checkCompletion(data)
    } else {
      console.log('ended')
    }

  }
}

function countDead(entities: models.server.Entity[]): number {
  return entities.reduce((acc, cv, index, array) => {
    return acc + (array[index].hp <= 0 ? 1 : 0)
  }, 0)
}

export function checkCompletion(data: models.server.BattleData) {
  // check if win
  const allEnemiesDead = countDead(data.monsters) === data.monsters.length
  console.log('enemigos muertos, ', countDead(data.monsters))
  console.log(data.monsters.length)
  if (allEnemiesDead) {
    console.log("DEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD")
    data.win = true
    return true
  }
  // check if loss
  const allHeroesDead = countDead(data.heroes) === data.heroes.length
  if (allHeroesDead) {
    data.win = false
    return true
  }
}