import { models } from '../../typings'
import { Player } from '../models/player'
import { battle } from './battle'

async function getPlayer(address: string) {
  let a = await Player.findOne({ address }/* , {}, { new: true, upsert: true } */)
  if (!a) {
    console.log('A')
    // a = await Player.findOneAndUpdate({ address }, {}, { new: true, upsert: true })
  }
  return a
}

async function createPlayer(address: string) {
  return await Player.findOneAndUpdate({ address }, {}, { new: true, upsert: true })
}

async function getLatestBattle(address: string, newBattle: boolean): Promise<models.server.BattleData | []> {
  let playerDoc = await Player.findOne({ address }/* , {}, { new: true, upsert: true } */)
  if (playerDoc?.battle?.length) {
    return playerDoc.battle[0]
  } else return []
}

async function newBattle(address: string): Promise<models.server.BattleData> {
  let playerDoc = await getPlayer(address)
  let battleData = battle.BattleData(['sorcerer', 'warrior', 'warrior'], ['golem', 'golem', 'golem', 'golem'])
  // init battle
  let newBattle = battle.BattleInstance(battleData, true)
  playerDoc.battle[0] = newBattle.data
  await playerDoc.save()
  return newBattle.data
}

async function saveBattleData(address: string, battleData: models.server.BattleData) {
  let playerDoc = await getPlayer(address)
  playerDoc.battle[0].data = battleData
  await playerDoc.save()
}

export const db = {
  getPlayer,
  createPlayer,
  getLatestBattle,
  newBattle,
  saveBattleData
}
