import express from 'express'
import { router } from './routes/routes'
import mongoose from 'mongoose'
import cors from 'cors'

function main() {
  const app = express()
  const PORT = 2500
  // const MONGODBADDRESS = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`
  const MONGODBADDRESS = `mongodb://kev:kev123@localhost:27017`
  mongoose.connect(MONGODBADDRESS, { dbName: 'dung' }).then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  })
  app.use(cors({
    origin: '*'
  }))
  app.use('', router())
}
main()