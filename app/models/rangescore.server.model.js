var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RangeScoreEntrySchema = new Schema({
  value : Number,
  score : Number
});

var RangeScoreSchema = new Schema({
  game : Schema.ObjectId,
  sequence : Number,
  name : String,
  ranges : [RangeScoreEntrySchema]
});

mongoose.model('RangeScore', RangeScoreSchema);
