var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GameSchema = new Schema({
  name : String,
  minNumPlayers : Number,
  maxNumPlayers : Number,
  scoringSystem : {
    type : String,
    match : ['Single|Range|Multi', 'Invalid Scoring System Entered!']
  }
});

mongoose.model('Game', GameSchema);
