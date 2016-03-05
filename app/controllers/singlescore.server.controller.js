var SingleScore = require('mongoose').model('SingleScore');
require('../../config/colors');

/**
 * Utility Method used to retrieve an error
 **/
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
                console.log('Single score has already been registered excepetion'.error);
                message = 'Single Score has already been registered';
                break;
            default:
                console.log(('Unknown Single Score error: ' + err.code + '!').error);
                message = 'Unknown error( ' + err.code + ') with Single Score';
                break;
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.error[errName].message) {
                message = err.errors[errName].message;
                console.log(('Got error with single score: ' + message).error);
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
    var singleScore = new SingleScore(req.body);

    console.log(('Got the new Single Score Entry: ' + JSON.stringify(singleScore)).debug);

    singleScore.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(singleScore);
        }
    });
};


/**
 * READ
 **/
exports.list = function (req, res, next) {
    SingleScore.find({}, function (err, singleScores) {
        if (err) {
            return next(err);
        }
        else {
            res.json(singleScores);
        }
    });
};

exports.read = function (req, res) {
    res.json(req.singleScore);
};

exports.listForGameId = function (req, res) {
    console.log('singleScore.listForGameId'.debug)
    res.json(req.singleScoreList);
}
/**
 * Update
 **/
exports.update = function (req, res, next) {
    SingleScore.findByIdAndUpdate(req.singleScore.id, req.body, function (err, singleScore) {
        if (err) {
            return next(err);
        }
        else {
            res.json(singleScore);
        }
    });
};

/**
 * Delete
 **/
exports.delete = function (req, res, next) {
    req.singleScore.remove(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.singleScore);
        }
    });
};

/***********************
 ***    MIDDLEWARE    ***
 ***********************/
/**
 * Finds a single score in the database with the given id
 **/
exports.singleScoreById = function (req, res, next, id) {
    SingleScore.findOne({
        _id: id
    }, function (err, singleScore) {
        if (err) {
            return next(err);
        }
        else {
            req.singleScore = singleScore;
            next();
        }
    });
};

/**
 * Finds all of the single scores associated with the game id
 **/
exports.singleScoresForGame = function (req, res, next, gameId) {
    console.log(('Looking for single scores for game id: ' + gameId).debug);
    SingleScore.find({
        game: gameId
    }, function (err, matchingSingleScores) {
        if (err) {
            return next(err);
        }
        else {
            req.singleScoreList = matchingSingleScores;
            next();
        }
    });
};

/**
 * Finds all of the single scores associated with the provided game id)
 **/
exports.singleScoreForGameId = function (gameId, callback) {
    console.log(('Looking for single scores for game id: ' + gameId).debug);

    SingleScore.find({
        game: gameId
    }, function (err, result) {
        callback(err, result);
    });
};

/**
 * Finds all of the multi scores
 **/
exports.findAll = function (callback) {
    SingleScore.find({}, function (err, result) {
        callback(err, result);
    });
};

/**
 * Updates (or creates) an array of single scores
 **/
exports.createOrUpdateCollection = function (singleScores, callback) {
    console.log(('SingleScore.CreateOrUpdateCollection called with: ' + JSON.stringify(singleScores)).debug);

    async.eachSeries(singleScores, function(singleScore, seriesCallback) {
        if (singleScore.id) {
            //this single score has an id, it's an update
            console.log(('Single Score had an id: ' + singleScore.id).debug);
            SingleScore.findByIdAndUpdate(singleScore.id, singleScore, function(err, singleScore){
                if (err) {
                    seriesCallback(err);
                }
                else {
                    console.log(('Single Score : ' + singleScore.id + 'successfully updated').debug);
                    seriesCallback();
                }
            });
        }
        else {
            //this single score did not have an id, it's a create
            var newSingleScore = new SingleScore(singleScore);

            console.log(('Built the new single score entry: ' + JSON.stringify(newSingleScore)).debug);
            newSingleScore.save(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    console.log(('Successfully created single score!').debug);
                    callback();
                }
            });
        }
    })
};