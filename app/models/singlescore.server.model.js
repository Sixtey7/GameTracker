var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SingleScoreSchema = new Schema({
  game : Schema.ObjectId,
  score : Number
});

mongoose.model('SingleScore', SingleScoreSchema);
