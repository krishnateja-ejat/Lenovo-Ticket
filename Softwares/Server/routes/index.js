var express = require('express');
var router = express.Router();
var models = require('../models/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/users', function(req, res) {
    models.User.create({
        email: req.body.email
    }).then(function(user) {
        res.json(user);
    });
});
router.post('/todos', function(req, res) {
    models.Todo.create({
        title: req.body.title,
        UserId: req.body.user_id
    }).then(function(todo) {
        res.json(todo);
    });
});
module.exports = router;
