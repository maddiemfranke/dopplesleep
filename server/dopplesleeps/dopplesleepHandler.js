var helper = require('../config/helpers.js');
var DoppleSleep = require('../dopplesleeps/dopplesleepModel.js');

module.exports = {

  // addData method
  addData: function(req, res){
    var newDataPoint = req.body;

    DoppleSleep.create(newDataPoint, function(err, dopplesleep){
      if (err) { // notifies if error is thrown
        console.log("mongo create datapoint err: ", err);
        helper.sendError(err, req, res);
      } else { // list created, sends 201 status
        //res.status(201);
        res.json(dopplesleep);
      }
    });
  },

  // deleteData method
  deleteData: function(req, res){
    var dataid = req.params.id;

    DoppleSleep.remove({'_id': dataid}, function(err, result){
      if (err) { // notifies if error is thrown
        console.log("mongo deleteOne list err: ", err);
        helper.sendError(err, req, res);
      } else { // delete successful, sends result of operation
        res.json(result);
      }
    });
  },

  // getData method
  getData: function(req, res){
    var deviceID = req.params.id
    DoppleSleep.find({ 'deviceID' : deviceID })
      .then(function(dopplesleeps){
        console.log(dopplesleeps);
        res.json(dopplesleeps);
      });
  },

  getAllData: function(req, res){
    DoppleSleep.find({})
    .then(function(dopplesleeps){ // returns array of lists
      res.json(dopplesleeps);
    });
  },


};
