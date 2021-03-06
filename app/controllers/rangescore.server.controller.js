var RangeScore = require('mongoose').model('RangeScore');
require('../../config/colors');

var async = require('async');

/**
 * Utility Method used to retrieve an error
 **/
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
                console.log('Range Score has already been registered excepetion'.error);
                message = 'Range Score has already been registered';
                break;
            default:
                console.log(('Unknown Range Score error: ' + err.code + '!').error);
                message = 'Unknown error( ' + err.code + ') with Range Score';
                break;
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.error[errName].message) {
                message = err.errors[errName].message;
                console.log(('Got error with Range Score: ' + message).error);
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
exports.create = function (req, res, next) {
    var rangeScore = new RangeScore(req.body);

    console.log(('Got the new Range Score Entry: ' + JSON.stringify(RangeScore)).debug);

    rangeScore.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(rangeScore);
        }
    });
};


/**
 * READ
 **/
exports.list = function (req, res, next) {
    RangeScore.find({}, function (err, rangeScores) {
        if (err) {
            return next(err);
        }
        else {
            res.json(rangeScores);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.rangeScore);
};

exports.listForGameId = function (req, res) {
    res.json(req.rangeScoreList);
}
/**
 * Update
 **/
exports.update = function (req, res, next) {
    RangeScore.findByIdAndUpdate(req.RangeScore.id, req.body, function (err, rangeScore) {
        if (err) {
            return next(err);
        }
        else {
            res.json(rangeScore);
        }
    });
};

/**
 * Delete
 **/
exports.delete = function (req, res, next) {
    req.RangeScore.remove(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.rangeScore);
        }
    });
};

/***********************
 ***    MIDDLEWARE    ***
 ***********************/
/**
 * Finds a Range Score in the database with the given id
 **/
exports.rangeScoreById = function (req, res, next, id) {
    RangeScore.findOne({
        _id: id
    }, function (err, rangeScore) {
        if (err) {
            return next(err);
        }
        else {
            req.rangeScore = rangeScore;
            next();
        }
    });
};

/**
 * Finds all of the Range Scores associated with the game id
 **/
exports.rangeScoresForGame = function (req, res, next, gameId) {
    RangeScore.find({
        game: gameId
    }, function (err, matchingRangeScores) {
        if (err) {
            return next(err);
        }
        else {
            req.rangeScoreList = matchingRangeScores;
            next();
        }
    });
};


/**
 * Finds all of the range scores associated with the provided game id)
 **/
exports.rangeScoreForGameId = function (gameId, callback) {
    console.log(('Looking for range scores for game id: ' + gameId).debug);

    RangeScore.find({
        game: gameId
    }, function (err, result) {
        callback(err, result);
    });
};

/**
 * Finds all of the multi scores
 **/
exports.findAll = function (callback) {
    RangeScore.find({}, function (err, result) {
        callback(err, result);
    });
};

/**
 * Updates (or creates) an array of range scores
 **/
exports.createOrUpdateCollection = function (rangeScores, callback) {
    console.log(('RangeScore.CreateOrUpdateCollection called with: ' + JSON.stringify(rangeScores)).debug);

    async.eachSeries(rangeScores, function (rangeScore, seriesCallback) {
        if (rangeScore.id) {
            //this range score has an id, it's an update
            console.log(('Range Score had an id: ' + rangeScore.id).debug);
            RangeScore.findByIdAndUpdate(rangeScore.id, rangeScore, function (err, rangeScore) {
                if (err) {
                    seriesCallback(err);
                }
                else {
                    console.log(('Range Score : ' + rangeScore.id + 'successfully updated').debug);
                    seriesCallback();
                }
            });
        }
        else {
            //this range score did not have an id, it's a create
            var newRangeScore = new RangeScore(rangeScore);

            console.log(('Built the new range score entry: ' + JSON.stringify(newRangeScore)).debug);
            newRangeScore.save(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    console.log(('Successfully created range score!').debug);
                    callback();
                }
            });
        }
    })
};
