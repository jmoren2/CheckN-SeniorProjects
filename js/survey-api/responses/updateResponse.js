'use strict';
const response = require('../responses.js').singleResponseSuccess;
const fail = require('../responses').singleResponseSuccess;
module.exports.updateResponse = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "surveyResponses";
        var item = JSON.parse(event.body);
        var surveyId = event.pathParameters.responseId
        var params = {
            TableName: tableName,
            Key:{
                "responseId": responseId
            },
        UpdateExpression: "set userId = :userId, responses = :responses",
        ExpressionAttributeValues:{
            ":responses":item.responses,
            ":userId" : item.userId
        },    
        ReturnValues:"UPDATED_NEW"
        };

    ddb.update(params, function(error, data) {
      if(error)
        fail(500, 'Update Responses failed. Error: ' + error, callback)
      else
        response(201, data, callback)
    });
    }
    else{
        fail(500,'Response updated failed. Error: JSON body is empty or undefined', callback);
    }
}