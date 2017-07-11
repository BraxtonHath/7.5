const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true}
  , order: Number
  , completed: {type: Boolean, default: false}
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
