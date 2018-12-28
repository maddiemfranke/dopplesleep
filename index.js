// require app, mongoose
var app = require('./server/server.js');
var mongoose = require('mongoose');
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://13.59.110.87:1883');
var DoppleSleep = require('./server/dopplesleeps/dopplesleepModel.js');

// set mongoURI
var mongoURI = 'mongodb://maddie:paclab@ec2-13-59-110-87.us-east-2.compute.amazonaws.com:27017/dopplesleep';

// connect db
mongoose.connect(mongoURI, { useMongoClient : true });
console.log('connected to monogdb');
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoURI);
  mongoose.connection.db.collection('dopplesleeps').count(function(err, count) {
    if( count == 0) {
        console.log("No Found Records.");
    }
    else {
        console.log("Found Records : " + count);
    }
  });
  //mongoose.connection.db.dropCollection('dopplesleeps');

});

client.on('connect', function () {
  client.subscribe('esp32/dopplesleep');
  console.log('mqtt client has subscribed');
});

client.on('message', function (topic, message){
  console.log(message.toString());
  parsedData= parseDataPoint(message.toString());
  DoppleSleep.create({
      qData : parsedData[0],
      iData : parsedData[1],
      time : parsedData[2],
      deviceID : parsedData[3]
  });
});

// set port
var port = process.env.PORT || 3000;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);


function parseDataPoint(message){
  message= message.toString();
  var parsedData = new Array();
  var firstComma = message.indexOf(',');
  var qData = message.substring(0, firstComma);
  var secondComma = message.indexOf(',', firstComma+1);
  var iData = message.substring(firstComma+1, secondComma);
  var thirdComma = message.indexOf(',', secondComma+1);
  var timeStamp = message.substring(secondComma+1, thirdComma);
  var fourthComma = message.indexOf(',', thirdComma+1);
  var sampleNum = message.substring(thirdComma+1, fourthComma);
  var deviceID = message.substring(fourthComma+1);
  parsedData.push(parseInt(qData));
  parsedData.push(parseInt(iData));
  parsedData.push(parseInt(timeStamp));
  parsedData.push(parseInt(deviceID));
  return parsedData;
}
