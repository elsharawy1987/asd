import { models } from "../../typings";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function chooseAttackTarget(heroes: models.server.Entity[]): number {
  let chosen: number | null = null
  let done = false
  while (!done) {
    chosen = getRandomInt(0, heroes.length)
    done = heroes[chosen].hp > 0 ? true : false
  }
  return chosen
}

function chooseHealTarget(monsters: models.server.Entity[]): number {
  let mapped = monsters.map((e, index) => ({ hp: e.hp, index }))
  mapped.sort((a, b) => a.hp - b.hp)
  return mapped[mapped.findIndex(i => i.hp > 0)].index
}

export const ai = {
  chooseAttackTarget,
  chooseHealTarget
}