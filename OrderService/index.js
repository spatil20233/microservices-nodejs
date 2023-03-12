import express from 'express'
import router from './routes.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.use('/orders', router)

app.get('/',(req,res) => {
  res.send('Order Service Started on 4004')
})

app.listen(4004,(req,res) => {
  console.log('Port : 4004 - Order Service Started ')
})