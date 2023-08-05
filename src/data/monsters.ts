import { models } from '../../typings/index'
import { Attack, Heal } from './abilities'

export const monsters: models.server.BasicEntities = {
  skeleton: {
    baseHp: 4,
    abilities: [Attack(1), Attack(2), Attack(1), Attack(1), Attack(1), null]
  },
  golem: {
    baseHp: 5,
    abilities: [Attack(3), Attack(2), Attack(2), Heal(2), Heal(2), null]
  }
}