var config = require('./config'),
mongoose = require('mongoose');

require('./colors');

module.exports = function() {
  console.log('Setting up the database...'.debug);
  var db = mongoose.connect(config.dbUri);

  console.log('Connected to the database...'.debug);
  require('../app/models/player.server.model');
  require('../app/models/game.server.model');
  require('../app/models/session.server.model');
  require('../app/models/multiscore.server.model');
  require('../app/models/rangescore.server.model');
  require('../app/models/singlescore.server.model');

  return db;
}
