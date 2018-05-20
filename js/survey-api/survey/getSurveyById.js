'use strict';
const getSingleSurveySuccess = require('../responses').singleSurveySuccess;
const getSurveyFail = require('../responses').SurveyFail;

module.exports.getSurveyById = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.surveyId !== undefined && 
            event.pathParameters.surveyId !== null && 
            event.pathParameters.surveyId !== "") {
            console.log("Received proxy: " + event.pathParameters.surveyId);

            var id = event.pathParameters.surveyId;
            var params = {
                TableName: "surveys",
                Key: {
                    "surveyId": id 
                }
            };
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getSurveyFail(500,'get Survey by Id failed. Error: ' + err, callback);
                else {
                    if(data.Item == null)
                      return getSurveyFail(404, 'No Survey Found', callback);
                    else
                      return getSingleSurveySuccess(200, data.Item, callback);
                }
            });
        }
        else
            return getSurveyFail(400, 'get Survey by Id failed.', callback);
    }
    else
        return getSurveyFail(400,'get Survey by Id failed', callback);
}