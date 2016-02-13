var scores = require('../controllers/score.server.controller')

module.exports = function(app) {
    app.route('/api/scores/game/:gameId')
        .get(scores.listForGameId);

    app.param('gameId', scores.findAllScoresForGame)
}