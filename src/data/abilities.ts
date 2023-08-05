import { models } from '../../typings'


export function Attack(damage: number, effects: string[] = []): models.server.Ability {
  return {
    name: `attack`,
    damage,
    effects,
    hostile: true
  }
}
export function Heal(damage: number, effects: string[] = []): models.server.Ability {
  return {
    name: `heal`,
    damage,
    effects,
    hostile: false
  }
}
export function Shield(damage: number, effects: string[] = []): models.server.Ability {
  return {
    name: `shield`,
    damage,
    effects,
    hostile: false
  }
}