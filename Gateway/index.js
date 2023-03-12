const express = require('express')
var proxy = require('express-http-proxy');
var cors = require('cors')
const app = express()

app.use(cors())
app.use('/user-proxy', proxy('http://localhost:4000'));
app.use('/product-proxy', proxy('http://localhost:4003'));
app.use('/order-proxy', proxy('http://localhost:4004'));

app.get('/',(req,res) => {
  res.send('Gateway Service Started on 4002')
})

app.listen(4002,(req,res) => {
  console.log('Port : 4002 - Gateway Started ')
})