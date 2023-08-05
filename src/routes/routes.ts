import express from 'express'
import bodyParser from 'body-parser'
import { playerController } from '../controllers/playerController'
import { battleController } from '../controllers/battleController'

export function router() {
  const r = express.Router()

  r.get('/test', (req, res) => {
    res.send('TEST')
    console.log('test')
  })

  r.post('/createPlayer', bodyParser.json(), playerController.createPlayer)

  r.get('/getPlayer/:address', playerController.getPlayer)

  r.post('/newBattle', bodyParser.json(), battleController.newBattle)

  r.post('/latestBattle', bodyParser.json(), battleController.latestBattle)

  r.post('/roll', bodyParser.json(), battleController.roll)

  r.post('/submitActions', bodyParser.json(), battleController.submitActions)

  return r
}