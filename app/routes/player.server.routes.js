var players = require('../../app/controllers/player.server.controller');

module.exports = function(app) {
  app.route('/api/players')
    .get(players.list)
    .post(players.create);

  app.route('/api/players/:playerId')
    .get(players.read)
    .put(players.update)
    .delete(players.delete);

  app.param('playerId', players.playerById);
}
