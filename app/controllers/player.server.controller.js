var Player = require('mongoose').model('Player');
require('../../config/colors');

/**
* Utility method used to retrieve an error
**/
var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch(err.code) {
      case 11000:
        console.log('Player has already been registered exception'.error);
        message = 'Player has already been registered';
        break;
      default:
        console.log('Unknown player error!'.error);
        message = 'Unknown error with player';
        break;
    }
  }
  else {
    for (var errName in err.errors) {
      if (err.error[errName].message) {
        message = err.errors[errName].message;
        console.log(('Got error with player: ' + message).error);
      }
    }
  }

  return message;
}

/**********************
*** CRUD OPERATIONS ***
**********************/

/**
* CREATE
**/
exports.create = function(req, res, next) {
  var player = new Player(req.body);

  console.log(('Created got the player: ' + JSON.stringify(req.body)).debug);
  console.log(('First name from body: ' + req.body.firstName).debug);
  console.log(('Last name from body: ' + req.body.lastName).debug);
  console.log(('First name: ' + player.firstName).debug);
  console.log(('Last Name: ' + player.lastName).debug);
  player.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(player);
    }
  });
};


/**
* READ
**/
exports.list = function(req, res, next) {
  Player.find({}, function(err, players) {
    if (err) {
      return next(err);
    }
    else {
      res.json(players);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.player);
};

/**
* Update
**/
exports.update = function(req, res, next) {
  Player.findByIdAndUpdate(req.player.id, req.body, function(err, player) {
    if (err) {
      return next(err);
    }
    else {
      res.json(player);
    }
  });
};

/**
* Delete
**/
exports.delete = function(req, res, next) {
  req.player.remove(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.player);
    }
  });
};

/***********************
***    MIDDLEWARE    ***
***********************/
/**
* Finds a player in the database with the given id
**/
exports.playerById = function (req, res, next, id) {
  Player.findOne({
    _id : id
  }, function(err, player) {
    if (err) {
      return next(err);
    }
    else {
      req.player = player;
      next();
    }
  });
};
