'use strict';

module.exports.getDog = (ddb, event, callback) => {
  ddb.get({TableName: 'dogs', Key: {'id': event.pathParameters.dogId}}, function(error, data) {
    if(error)
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({message: 'get dogs failed. Error: ' + error})
      });
    else
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({dog: data.Item})
      });
  });
}