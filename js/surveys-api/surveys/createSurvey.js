'use strict';

const uuid = require('uuid');
const success = require('../responses.js').singleSurveySuccess;
const fail = require('../responses.js').SurveyFail;

module.exports.createSurvey = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.surveyId = uuid.v4();

    var params = {
        index: 'surveys',
        type: 'survey',
        id: body.surveyId,
        body: body
    };
    
    esClient.put(params, function(error, data) {
      if(error) {
        return fail(500, 'Survey creation failed. Error: ' + error, callback);
      } else {
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Survey creation failed.', callback)
  } 
};