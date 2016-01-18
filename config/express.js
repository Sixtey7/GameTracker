var config = require('./config'),
http = require('http'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

//TODO: Requiring this guy seperate because I have no idea if it'll work
require('./colors');

module.exports = function(db) {
  console.log('creating the express app...'.debug);
  var app = express();

  var server = http.createServer(app);

  //set up our middleware
  if (process.env.NODE_ENV === 'development') {
    console.log('Turning on the morgan middleware for development...'.debug);
    app.use(morgan('dev'));
  }
  else if (process.env.NODE_ENV === 'production') {
    console.log('Turning on the compress middleware for production...'.debug);
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended:true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  //TODO: Turn these on when I have views to show
  //app.set('views', './app/views');
  //app.set('view engine', 'ejs');

  //Add in our routes
  require('../app/routes/player.server.routes.js')(app);
  require('../app/routes/game.server.routes.js')(app);

  //TODO: Turn this back on when I have angular stuff to show
  app.use(express.static('./public'));

  return server;

}
