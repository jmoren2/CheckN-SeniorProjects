'use strict';

const uuid = require('uuid');
const success = require('../responses.js').singleSurveySuccess;
const fail = require('../responses.js').SurveyFail;

module.exports.createSurvey = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.surveyId = uuid.v4();

    var survey = {
        Item: body,
        TableName: 'surveys'

    }
    
    ddb.put(survey, function(error, data) {
      if(error) {
        return fail(500, 'Survey creation failed. Error: ' + error, callback);
      } else {
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Survey creation failed.', callback)
  } 
}