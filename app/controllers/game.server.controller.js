var Game = require('mongoose').model('Player');
require('../../config/colors');

/**********************
*** CRUD OPERATIONS ***
**********************/

/**
* CREATE
**/
exports.create = function (req, res, next) {
  var game = new Game(req.body);

  //quick, debug logging
  console.log(('Create got the game: ' + JSON.stringify(req.body)).debug);
  console.log(('Created the Game: ' + JSON.stringify(game)).debug);

  game.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(game);
    }
  });
};

/**
* READ
**/
exports.list = function (req, res, next) {
  Game.find({}, function (err, games) {
    if (err) {
      return next(err);
    }
    else {
      res.json(games);
    }
  });
};

exports.read = function (req, res) {
  res.json(req.game);
};
