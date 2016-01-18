var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ScoreEntrySchema = new Schema({
  player : {
    type : Schema.ObjectId,
    ref : 'Player'
  },
  score : Number
});

var SessionSchema = new Schema({
  game : {
    type : Schema.ObjectId,
    ref : 'Game'
  },
  datePlayed : {
    type : Date,
    default : Date.now
  },
  Scores : [ScoreEntrySchema]
});

mongoose.model('Session', SessionSchema);
