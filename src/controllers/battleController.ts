import { models } from '../../typings'
import { db } from '../services/db'
import { battle } from '../services/battle'
import { Request, Response } from 'express'
import { ai } from '../services/ai'

async function newBattle(req, res) {
  let address: string = req.body.address
  let battle = await db.newBattle(address)
  res.send({ battle })
}

async function latestBattle(req, res) {
  let address: string = req.body.address
  let battle = await db.getLatestBattle(address, false)
  res.send({ battle })
}

async function submitActions(req: Request, res: Response) {
  console.log('submitting user actions')
  let actions = <models.server.Action[]>req.body.actions
  let address: string = req.body.address
  try {
    // load db DOC
    let playerDoc = await db.getPlayer(address)
    let battleData = <models.server.BattleData>playerDoc.battle[0]
    // initiate battle instance
    let currentBattle = battle.BattleInstance(battleData, false)
    if (currentBattle.data.win !== null) {
      console.log('ENDED')
      res.send('ended')
      return
    }
    // modify battle data
    let ms = currentBattle.data.monsters
    let hs = currentBattle.data.heroes
    currentBattle.resolveActions('heroes', actions)
    currentBattle.resolveActions('monsters', undefined)
    currentBattle.nextRound()
    // update doc.battle.save db DOC
    playerDoc.battle[0] = currentBattle.data
    await playerDoc.save()
    // response with currentBattledata
    res.send({
      battle: currentBattle.data
    })
  } catch (error) {
    console.log(error)
  }
}

async function roll(req: Request, res: Response) {
  console.log('submitting user roll')
  let address: string = req.body.address
  let excludedIndexes: number[] = req.body.excludedIndexes
  // load db DOC
  let playerDoc = await db.getPlayer(address)
  let battleData = <models.server.BattleData>playerDoc.battle[0]
  // initiate battle instance
  let currentBattle = battle.BattleInstance(battleData, false)
  if (currentBattle.data.remainingRolls === 0) {
    res.send({
      msg: `Can't roll`,
      battle: currentBattle.data
    })
  } else {
    // roll
    currentBattle.rollForGroup('heroes', excludedIndexes)
    // update doc.battle.save db DOC
    playerDoc.battle[0] = currentBattle.data
    await playerDoc.save()
    // res
    res.send({ msg: 'roll success', battle: currentBattle.data })
  }
}

export const battleController = {
  newBattle,
  latestBattle,
  submitActions,
  roll
}