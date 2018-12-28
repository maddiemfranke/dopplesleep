var mongoose = require('mongoose');

var DoppleSleepSchema = new mongoose.Schema({
  qData : String,
  iData : String,
  time : String,
  deviceID : String
});


module.exports = mongoose.model('DoppleSleep', DoppleSleepSchema);
