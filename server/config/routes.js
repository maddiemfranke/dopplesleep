// require dataHandler
var dopplesleepHandler = require('../dopplesleeps/dopplesleepHandler.js');

// export function
module.exports = function(app, express){
  // POST - addData
  app.post('/api/datapoints', dopplesleepHandler.addData);
  // GET - getData
  app.get('/api/datapoints/:id', dopplesleepHandler.getData);
  // DELETE - deletes a datapoint
  app.delete('/api/datapoints/:id', dopplesleepHandler.deleteData);

};
