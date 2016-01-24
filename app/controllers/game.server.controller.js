var Game = require('mongoose').model('Game');
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

/**
* Update
**/
exports.update = function(req, res, next) {
  Game.findByIdAndUpdate(req.game.id, req.body, function(err, game){
    if (err) {
      return next(err);
    }
    else {
      res.json(game);
    }
  });
};

/**
* Delete
**/
exports.delete = function (req, res, next) {
  req.game.remove(function (err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.game);
    }
  });
};

/***********************
***    MIDDLEWARE    ***
***********************/

/**
* Finds a game in the database with the given id
**/
exports.gameById = function (req, res, next, id) {
  console.log('game.gameById'.debug);
  Game.findOne({
    _id : id
  }, function(err, game) {
      if (err) {
        return next(err);
      }
      else {
        req.game = game;
        next();
      }
  });
};

/**
* Utility method used to retrieve an error
**/
var getErrorMessage = function (err) {
  var message = '';

  if (err.code) {
    switch(err.code) {
      case 11000:
        console.log('Game has already be registered exception'.error);
        message = 'Game has already been registered';
        break;
      default:
        console.log('Unknown game error!'.error);
        message = 'Unknown error with game';
        break;
    }
  }
  else {
    for (var errName in err.errors) {
      if (err.error[errName].message) {
        message = err.errors[errName].message;
        console(('Got error with game: ' + message).erroer);
      }
    }
  }

  return message;
}
