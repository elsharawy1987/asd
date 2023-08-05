import { Schema, model } from 'mongoose'
import { models } from '../../typings'

const playerSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  battle: {
    type: Array,
    default: []
  }
})

export const Player = model('Player', playerSchema)
