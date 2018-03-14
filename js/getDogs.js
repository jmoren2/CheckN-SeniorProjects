'use strict';

module.exports.getDogs = (ddb, event, callback) => {
  ddb.scan({TableName: 'dogs'}, function(error, data) {
    if(error)
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({message: 'get dogs failed. Error: ' + error})
      });
    else
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({dogs: data.Items})
      });
  });
}