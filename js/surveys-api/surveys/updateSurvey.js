'use strict';
const response = require('../responses.js').singleSurveySuccess;
const fail = require('../responses').SurveyFail;
module.exports.updateSurvey = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "surveys";
        var item = JSON.parse(event.body);
        var surveyId = event.pathParameters.surveyId
        var params = {
            TableName: tableName,
            Key:{
                "surveyId": surveyId
            },
        UpdateExpression: "set userId = :userId, responses = :responses, questions = :questions",
        ExpressionAttributeValues:{
            ":responses":item.responses,
            ":questions":item.questions,
            ":userId" : item.userId
        },    
        ReturnValues:"UPDATED_NEW"
        };

    ddb.update(params, function(error, data) {
      if(error)
        fail(500, 'Update Survey failed. Error: ' + error, callback)
      else
        response(201, data, callback)
    });
    }
    else{
        fail(500,'Survey content updated failed. Error: JSON body is empty or undefined', callback);
    }
}
