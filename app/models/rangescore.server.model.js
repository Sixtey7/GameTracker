var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RangeScoreEntrySchema = new Schema({
  value : Number,
  score : Number
});

var RangeScoreSchema = new Schema({
  name : String,
  game : Schema.ObjectId,
  sequence : Number,
  ranges : [RangeScoreEntrySchema]
});

RangeScoreSchema.virtual('type').get(function() {
  return 'Range';
});

RangeScoreSchema.set('toJSON', {
  virtuals : true,
  getters : true
});

mongoose.model('RangeScore', RangeScoreSchema);
