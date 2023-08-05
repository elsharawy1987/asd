import { db } from '../services/db'

async function getPlayer(req, res) {
  let p = await db.getPlayer(req.params.address)
  console.log(p)
  if (p) {
    res.send(p)
  } else res.status(204).send('Address not found')
}

async function createPlayer(req, res) {
  console.log('a')
  let p = await db.createPlayer(req.body.address)
  res.send(p)
}

export const playerController = {
  getPlayer,
  createPlayer
}