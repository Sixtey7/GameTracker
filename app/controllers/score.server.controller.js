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
exports.listForGameId = function (req, res) {
    res.json(req.scoreList);
};

/**
 * Method To Get All Scores For A Game
 **/
exports.findAllScoresForGame = function (req, res, next, gameId) {
    async.parallel({
            'SINGLE': function (callback) {
                SingleScoreController.singleScoreForGameId(gameId, function (err, result) {
                    callback(err, result);
                })
            },
            'MULTI': function (callback) {
                MultiScoreController.multiScoreForGameId(gameId, function (err, result) {
                    callback(err, result);
                })
            },
            'RANGE': function (callback) {
                RangeScoreController.rangeScoreForGameId(gameId, function (err, result) {
                    callback(err, result);
                })
            }
        },
        function (err, result) {
            if (err) {
                console.log(('Got an error attempting to retrieve all score types for game id: ' + gameId + '\n' + err).error);
            }
            else {
                //first combine all of the arrays into a single array
                var fullScoreArray = result.SINGLE.concat(result.MULTI, result.RANGE);

                //now let's build a sorted array that has all of the elements in sequence number
                var sortedScoreArray = new Array();
                for (var i = 0; i < fullScoreArray.length; i++) {
                    sortedScoreArray[fullScoreArray[i].sequence] = fullScoreArray[i];
                }

                //last, remove any undefined elements (due to gaps in the sequence)
                req.scoreList = sortedScoreArray.filter(function (n) {
                    return n != undefined
                });

                if (req.scoreList.length < sortedScoreArray.length) {
                    console.log(('WARNING: The size of the final list is smaller than the sorted list ' +
                    '- there are gaps in the data!').warn);
                }
                next();
            }
        });
};

/**
 * Method that will find all scores
 */
exports.findAllScores = function (req, res, next) {
    async.parallel({
            'SINGLE': function (callback) {
                SingleScoreController.findAll(function (err, response) {
                    callback(err, response);
                })
            },
            'MULTI': function (callback) {
                MultiScoreController.findAll(function (err, response) {
                    callback(err, response);
                })
            },
            'RANGE': function (callback) {
                RangeScoreController.findAll(function (err, response) {
                    callback(err, response);
                })
            }
        },
        function (err, result) {
            if (err) {
                console.log(('Got an error trying to findAllScores: ' + err).error);
            }
            else {
                console.log(('About to log the result from findAllScores').debug);
                console.log((JSON.stringify(result)).debug);
                var combinedList = result.SINGLE.concat(result.MULTI, result.RANGE);

                res.json(combinedList);
                next();
            }
        });
};

exports.updateScores = function (req, res, next) {
    if (req.body !== undefined) {
        var scores = req.body;
        console.log(('Got the following scores in updateScores:\n' + JSON.stringify(scores)).debug);

        var singleScores = new Array();
        var rangeScores = new Array();
        var multiScores = new Array();

        for (var i = 0; i < scores.length; i++) {
            var score = scores[i];

            switch (score.type) {
                case 'Single' :
                    singleScores.push(score);
                    break;
                case 'Range' :
                    rangeScores.push(score);
                    break;
                case 'Multi' :
                    multiScores.push(score);
                    break;
            }

            /* DEBUG BLOCK */
            console.log(('----------\nSingle Scores----------\n' + JSON.stringify(singleScores) + '\n').debug);
            console.log(('----------\nRange Scores----------\n' + JSON.stringify(rangeScores) + '\n').debug);
            console.log(('----------\nMulti Scores----------\n' + JSON.stringify(multiScores) + '\n').debug);
            /* END DEBUG BLOCK */
            async.parallel({
                    'SINGLE': function (callback) {
                        if (singleScores.length > 0) {
                            SingleScoreController.createOrUpdateCollection(singleScores, callback);
                        }
                        else {
                            callback();
                        }
                    },
                    'MULTI': function (callback) {
                        if (multiScores.length > 0) {
                            MultiScoreController.createOrUpdateCollection(multiScores, callback);
                        }
                        else {
                            callback();
                        }
                    },
                    'RANGE': function (callback) {
                        if (rangeScores.length > 0) {
                            RangeScoreController.createOrUpdateCollection(rangeScores, callback);
                        }
                        else {
                            callback();
                        }
                    }
                },
                function (err, result) {
                    if (err) {
                        console.log(('Got an error trying to saveAllScores: ' + err).error);
                    }
                    else {
                        console.log(('Successfully saved all scores!').debug);
                    }
                });
        }
    }
};
