const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoScheme = new Schema({
    text: String,
    userId: Schema.ObjectId
})
mongoose.model('toDo', toDoScheme)