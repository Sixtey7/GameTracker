var singleScores = require('../../app/controllers/singlescore.server.controller');

module.exports = function (app) {
  app.route('/api/singleScores')
    .get(singleScores.list)
    .post(singleScores.create);

  app.route('/api/singleScores/:singleScoreId')
    .get(singleScores.read)
    .put(singleScores.update)
    .delete(singleScores.delete);

  app.route('/api/singleScores/game/:ssGameId')
    .get(singleScores.listForGameId);


  app.param('singleScoreId', singleScores.singleScoreById);
  app.param('ssGameId', singleScores.singleScoresForGame);
}
