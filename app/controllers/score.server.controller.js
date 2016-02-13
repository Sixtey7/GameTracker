var SingleScoreController = require('./singlescore.server.controller'),
MultiScoreController = require('./multiscore.server.controller'),
RangeScoreController = require('./rangescore.server.controller');

var async = require('async');

require('../../config/colors');

/**
 * Method that will return all of the scores for the game id
 * @param req
 * @param res
 */
exports.listForGameId = function(req, res) {
    res.json(req.scoreList);
}

/**
* Method To Get All Scores For A Game
**/
exports.findAllScoresForGame = function(req, res, next, gameId) {
  async.parallel({
      'SINGLE' : function(callback) {
        SingleScoreController.singleScoreForGameId(gameId, function(err, result) {
            callback(err, result);
        })
      },
      'MULTI' : function(callback) {
        MultiScoreController.multiScoreForGameId(gameId, function(err, result) {
            callback(err, result);
        })
      },
      'RANGE' : function(callback) {
        RangeScoreController.rangeScoreForGameId(gameId, function(err, result) {
            callback(err, result);
        })
      }
    },
    function(err, result) {
        if (err) {
            console.log(('Got an error attempting to retrieve all score types for game id: ' + gameId + '\n' + err).error);
        }
        else {

            console.log(('Logging response from findAllScoresForGame').debug);
            console.log((JSON.stringify(result.SINGLE)).debug);

            req.scoreList = result.SINGLE.concat(result.MULTI, result.RANGE);
            //req.scoreList = result;
            next();
        }
    });
};
