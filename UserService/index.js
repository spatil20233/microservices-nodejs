import express from 'express'
import router from './routes.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.use('/users', router)

app.get('/',(req,res) => {
  res.send('User Service Started on 4000')
})

app.listen(4000,(req,res) => {
  console.log('Port : 4000 - User Service Started ')
})