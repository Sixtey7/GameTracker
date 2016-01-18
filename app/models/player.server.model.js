var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  firstName : String,
  lastName : String,
  created : {
    type : Date,
    default : Date.now
  }
});

//Define a virtual property
PlayerSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

PlayerSchema.set('toJSON', {
  virtuals : true,
  getters : true
});

mongoose.model('Player', PlayerSchema);
