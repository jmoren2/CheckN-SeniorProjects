'use strict';


const success = require('./responses.js').singleLocationSuccess;
const fail = require('./responses.js').LocationsFail;

module.exports.createLocation = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);

    var locations = {
        Item: body,
        TableName: 'locations'

    }
    
    ddb.put(locations, function(error, data) {
      if(error) {
        return fail(500, 'Location creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Location creation failed.', callback)
  } 
}