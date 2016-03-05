var MultiScore = require('mongoose').model('MultiScore');
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
                console.log('Multi Score has already been registered excepetion'.error);
                message = 'Multi Score has already been registered';
                break;
            default:
                console.log(('Unknown Multi Score error: ' + err.code + '!').error);
                message = 'Unknown error( ' + err.code + ') with Multi Score';
                break;
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.error[errName].message) {
                message = err.errors[errName].message;
                console.log(('Got error with Multi Score: ' + message).error);
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
    var multiScore = new MultiScore(req.body);

    console.log(('Got the new Multi Score Entry: ' + JSON.stringify(MultiScore)).debug);

    multiScore.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(multiScore);
        }
    });
};


/**
 * READ
 **/
exports.list = function (req, res, next) {
    MultiScore.find({}, function (err, multiScores) {
        if (err) {
            return next(err);
        }
        else {
            res.json(multiScores);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.multiScore);
};

exports.listForGameId = function (req, res) {
    res.json(req.multiScoreList);
}
/**
 * Update
 **/
exports.update = function (req, res, next) {
    MultiScore.findByIdAndUpdate(req.multiScore.id, req.body, function (err, multiScore) {
        if (err) {
            return next(err);
        }
        else {
            res.json(multiScore);
        }
    });
};

/**
 * Delete
 **/
exports.delete = function (req, res, next) {
    req.multiScore.remove(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.multiScore);
        }
    });
};

/***********************
 ***    MIDDLEWARE    ***
 ***********************/
/**
 * Finds a Multi Score in the database with the given id
 **/
exports.multiScoreById = function (req, res, next, id) {
    MultiScore.findOne({
        _id: id
    }, function (err, multiScore) {
        if (err) {
            return next(err);
        }
        else {
            req.multiScore = multiScore;
            next();
        }
    });
};

/**
 * Finds all of the Multi Scores associated with the game id
 **/
exports.multiScoresForGame = function (req, res, next, gameId) {
    MultiScore.find({
        game: gameId
    }, function (err, matchingMultiScores) {
        if (err) {
            return next(err);
        }
        else {
            req.multiScoreList = matchingMultiScores;
            next();
        }
    });
};

/**
 * Finds all of the multi scores associated with the provided game id)
 **/
exports.multiScoreForGameId = function (gameId, callback) {
    console.log(('Looking for multi scores for game id: ' + gameId).debug);

    MultiScore.find({
        game: gameId
    }, function (err, result) {
        callback(err, result);
    });
};

/**
 * Finds all of the multi scores
 **/
exports.findAll = function (callback) {
    MultiScore.find({

    }, function(err, result) {
        callback(err, result);
    });
};

/**
 * Updates (or creates) an array of multi scores
 **/
exports.createOrUpdateCollection = function (multiScores, callback) {
    console.log(('MultiScore.CreateOrUpdateCollection called with: ' + JSON.stringify(multiScores)).debug);

    async.eachSeries(multiScores, function (multiScore, seriesCallback) {
        if (multiScore.id) {
            //this multi score has an id, it's an update
            console.log(('Multi Score had an id: ' + multiScore.id).debug);
            MultiScore.findByIdAndUpdate(multiScore.id, multiScore, function (err, multiScore) {
                if (err) {
                    seriesCallback(err);
                }
                else {
                    console.log(('Multi Score : ' + multiScore.id + 'successfully updated').debug);
                    seriesCallback();
                }
            });
        }
        else {
            //this multi score did not have an id, it's a create
            var newMultiScore = new MultiScore(multiScore);

            console.log(('Built the new multi score entry: ' + JSON.stringify(newMultiScore)).debug);
            newMultiScore.save(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    console.log(('Successfully created multi score!').debug);
                    callback();
                }
            });
        }
    })
};