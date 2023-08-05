import { Attack, Heal } from './abilities'
import { models } from '../../typings/index'

export const  heroes: models.server.BasicEntities = {
  sorcerer: {
    baseHp: 3,
    abilities: [Attack(1), Attack(2), Attack(1), Attack(1), Heal(2), null]
  },
  warrior: {
    baseHp: 4,
    abilities: [Attack(3), Attack(1), Attack(1), Attack(1), null, null]
  },
  rogue: {
    baseHp: 3,
    abilities: [Attack(1, ['slash']), Attack(3), Attack(1), Attack(1), null, null]
  }
}