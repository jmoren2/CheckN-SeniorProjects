'use strict';

const uuid = require('uuid');
const success = require('../responses.js').singleResponseSuccess;
const fail = require('../responses.js').ResponseFail;

module.exports.createResponse = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    if(!body.hasOwnProperty('responses') || body.responses === undefined){
          return fail(404, 'Responses is missing', callback);
    }
    body.responseId = uuid.v4();
    body.surveyId = event.pathParameters.surveyId
    var response = {
        Item: body,
        TableName: 'surveyResponses'

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