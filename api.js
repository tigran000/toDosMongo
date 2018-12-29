const express = require("express")
const mongoose = require('mongoose')
require('./todoScheme')
const toDo = mongoose.model('toDo')
const api = express.Router()

api.get('/api/todos', (req, res) => {
  toDo.find({}, (err, toDos) => {
    res.json(toDos)
  })

})

api.post('/api/todos', (req, res) => {
  const newTodo = new toDo({
    text: req.body.text
  })

  newTodo.save()
    .then(() => {
      res.end('ADDED')
    })

})

api.put('/api/todos/:postID', (req, res) => {
  toDo.updateOne({ _id: req.params.postID }, { text: req.body.text }, () => {
    res.end('UPDATED')
  })
})


api.delete('/api/todos/:postID', (req, res) => {
  toDo.deleteOne({ _id: req.params.postID }, () => {
    res.end("DELETED")
  })
})

module.exports = api