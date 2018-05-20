'use strict';
const success = require('../responses').singleSurveySuccess;
const fail = require('../responses').SurveyFail;
module.exports.updateSurvey = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var item = JSON.parse(event.body);
        var surveyId = event.pathParameters.surveyId;
        var params = {
            index: 'surveys',
            type: 'survey',
            id: surveyId,
            body: item
        };

        esClient.update(params, function(error, data) {
          if(error)
            fail(500, 'Update Survey failed. Error: ' + error, callback);
          else
            success(201, data._source, callback)
        });
    }
    else{
        fail(500,'Survey content updated failed. Error: JSON body is empty or undefined', callback);
    }
};