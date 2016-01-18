var games = require('../../app/controllers/game.server.controller');

module.exports = function(app) {
  app.route('/api/games')
    .get(games.list)
    .post(games.create);

  app.route('/api/games/:gameId')
    .get(games.read)
    .put(games.update)
    .delete(games.delete);

  app.param('gameId', games.gameById);
}
