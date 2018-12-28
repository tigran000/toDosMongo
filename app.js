const path = require('path')
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const api = require('./api')

mongoose.connect('mongodb://localhost:27017/todos',{ useNewUrlParser: true });
const app = express()
const PORT = 5959

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use('/', api)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
