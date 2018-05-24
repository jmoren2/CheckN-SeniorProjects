'use strict';

const uuid = require('uuid');
const success = require('../responses.js').singleResponseSuccess;
const fail = require('../responses.js').ResponseFail;

module.exports.createResponse = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {
    var body = JSON.parse(event.body);
    body.responseId = uuid.v4();
    body.surveyId = event.pathParameters.surveyId;
    var params = {
        index: 'responses',
        type: 'response',
        id: body.responseId,
        body: body
    };
    
    esClient.create(params, function(error, data) {
      if(error) {
        return fail(500, 'Response creation failed. Error: ' + error, callback);
      } else {
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Response creation failed.', callback)
  } 
};