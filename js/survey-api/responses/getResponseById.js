'use strict';
const getSingleResponseSuccess = require('../responses').singleResponseSuccess;
const getResponseFail = require('../responses').ResponseFail;

module.exports.getResponseById = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.responseId !== undefined && 
            event.pathParameters.responseId !== null && 
            event.pathParameters.responseId !== "") {
            console.log("Received proxy: " + event.pathParameters.responseId);

            var id = event.pathParameters.responseId;
            var params = {
                TableName: "surveyResponses",
                Key: {
                    "responseId": id 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getResponseFail(500,'get Response by Id failed. Error: ' + err, callback);
                else {
                    if(data.Item == null)
                      return getResponseFail(404, 'No Response Found', callback);
                    else
                      return getSingleResponseSuccess(200, data.Item, callback);
                }
            });
        }
        else
            return getResponseFail(400, 'get Response by Id failed.', callback);
    }
    else
        return getResponseFail(400,'get Response by Id failed', callback);
}