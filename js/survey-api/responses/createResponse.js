'use strict';

const uuid = require('uuid');
const success = require('../responses.js').singleResponseSuccess;
const fail = require('../responses.js').ResponseFail;

module.exports.createResponse = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.responseId = uuid.v4();

    var response = {
        Item: body,
        TableName: 'responses'

    }
    
    ddb.put(response, function(error, data) {
      if(error) {
        return fail(500, 'Response creation failed. Error: ' + error, callback);
      } else {
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Response creation failed.', callback)
  } 
}