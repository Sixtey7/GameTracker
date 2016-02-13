var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SingleScoreSchema = new Schema({
  name : String,
  game : Schema.ObjectId,
  sequence : Number,
  score : Number
});

SingleScoreSchema.virtual('type').get(function() {
  return 'Single';
});

SingleScoreSchema.set('toJSON', {
  virtuals : true,
  getters : true
});

mongoose.model('SingleScore', SingleScoreSchema);
