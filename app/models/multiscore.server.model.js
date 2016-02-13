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

MultiScoreSchema.virtual('type').get(function() {
  return 'Multi';
});

MultiScoreSchema.set('toJSON', {
  virtuals : true,
  getters : true
});

mongoose.model('MultiScore', MultiScoreSchema);
