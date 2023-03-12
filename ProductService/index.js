import express from 'express'
import router from './routes.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.use('/products', router)

app.get('/',(req,res) => {
  res.send('Product Service Started on 4003')
})

app.listen(4003,() => {
  console.log('Port : 4003 - Product Service Started ')
})