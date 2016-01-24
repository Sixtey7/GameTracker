var multiScores = require('../../app/controllers/multiscore.server.controller');

module.exports = function (app) {
  app.route('/api/multiScores')
    .get(multiScores.list)
    .post(multiScores.create);

  app.route('/api/multiScores/:multiScoreId')
    .get(multiScores.read)
    .put(multiScores.update)
    .delete(multiScores.delete);

  app.route('/api/multiScores/game/:msGameId')
    .get(multiScores.listForGameId);


  app.param('multiScoreId', multiScores.multiScoreById);
  app.param('msGameId', multiScores.multiScoresForGame);
}
