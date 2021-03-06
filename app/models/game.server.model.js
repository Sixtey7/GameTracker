var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GameSchema = new Schema({
  name : String,
  minNumPlayers : Number,
  maxNumPlayers : Number,
  scoringSystem : {
    type : String,
    enum : ['Single', 'Range', 'Multi', 'Complex']
  }
});

mongoose.model('Game', GameSchema);
