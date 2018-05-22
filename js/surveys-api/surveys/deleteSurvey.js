'use strict';
const deleteSurveySuccess = require('../responses').deleteSurveySuccess;
const deleteSurveyFail = require('../responses').SurveyFail;

module.exports.deleteSurvey = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.surveyId !== undefined && 
            event.pathParameters.surveyId !== null && 
            event.pathParameters.surveyId !== "") {
            
            var id = event.pathParameters.surveyId;
            var params = {
                index: 'surveys',
                type: 'survey',
                id: id
            };

            console.log("Attempting a conditional delete...");
    
            esClient.delete(params, function(err, data) {
                if(err)
                    return deleteSurveyFail(500, 'Delete Survey failed. Error: ' + err, callback);
                else
                    return deleteSurveySuccess(callback);
            });
        }
        else
            return deleteSurveyFail(400, 'Delete Survey failed.', callback);
    }
    else
        return deleteSurveyFail(400, 'Delete Survey failed.', callback);
};
