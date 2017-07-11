const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Todos = require('./models/todos');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todobrax');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.sendFile(__dirname, "/static/index.html");
});


// GET
app.get('/api/Todos', function (req, res) {
  Todos.find({}).then(function(results) {
    res.json(results);
  });
});

// POST
app.post('/api/Todos', function (req, res) {
  const todo = new Todos ({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  });
  todo.save();
  res.json(Todos);
});

// GET by ID
app.get('/api/Todos/:id', function(req, res) {
  var id = req.params.id;
  Todos.find({_id: id}).then(function(todo) {
    res.json(todo);
  });
});

// PUT update the todo
app.put('/api/Todos/:id', function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var order = req.body.order;
  var completed = req.body.completed;
  Todos.findOne({_id: id}).then(function(result) {
    result.title = title;
    result.order = order;
    result.completed = completed;
    result.save();
  });
  res.json(Todos);
});

// PATCH
app.patch('/api/Todos/:id', function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var order = req.body.order;
  var completed = req.body.completed;
  if (req.body.title) {
    Todos.update(
      {_id: id},
      {$set: {title: title}}
    ).then(function(result){
      result.save();
    });
  }
  if (req.body.order) {
    Todos.update(
      {_id: id},
      {$set: {order: order}}
    ).then(function(result){
      result.save();
    });
  }
  if (req.body.completed) {
    Todos.update(
      {_id: id},
      {$set: {completed: completed}}
    ).then(function(result){
      result.save();
    });
  }
  res.json(Todos);
});

// DELETE get rid of the todo
app.delete('/api/Todos/:id', function(req, res) {
  var id = req.params.id;
  Todos.deleteOne({
    _id: id
  }).then(function(result) {
    res.json(result);
  });
});


app.listen(3000, function () {
  console.log('Express running on http://localhost:3000/.')
});
