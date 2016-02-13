var rangeScores = require('../../app/controllers/rangescore.server.controller');

module.exports = function (app) {
  app.route('/api/rangeScores')
    .get(rangeScores.list)
    .post(rangeScores.create);

  app.route('/api/rangeScores/:rangeScoreId')
    .get(rangeScores.read)
    .put(rangeScores.update)
    .delete(rangeScores.delete);

  app.route('/api/rangeScores/game/:rsGameId')
    .get(rangeScores.listForGameId);


  app.param('rangeScoreId', rangeScores.rangeScoreById);
  app.param('rsGameId', rangeScores.rangeScoresForGame);
}
