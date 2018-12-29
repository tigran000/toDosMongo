const path = require('path')
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const api = require('./api')

mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true });
const app = express()
const PORT = 5959

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  next()
}
app.use(allowCrossDomain); // plumbing it in as middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use('/', api)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})