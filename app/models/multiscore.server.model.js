var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MultiScoreSchema = new Schema({
  game : Schema.ObjectId,
  sequence : Number,
  name : String,
  multiplier : Number,
  hasMax : Boolean,
  maxIterations : Number
});

mongoose.model('MultiScore', MultiScoreSchema);
