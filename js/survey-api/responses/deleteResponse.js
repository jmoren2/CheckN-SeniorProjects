'use strict';
const deleteResponseSuccess = require('../responses').deleteResopnseSuccess;
const deleteResponseFail = require('../responses').ResponseFail;

module.exports.deleteResponse = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.responseId !== undefined && 
            event.pathParameters.responseId !== null && 
            event.pathParameters.responseId !== "") {
            
            var id = event.pathParameters.responseId;
            var params = {
                TableName: "surveyResponses",
                Key: {
                    "responseId" : id
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteResponseFail(500, 'Delete Survery Response failed. Error: ' + err, callback);
                else
                    return deleteResponseSuccess(callback);
            });
        }
        else
            return deleteResponseFail(400, 'Delete Survery Response failed.', callback);
    }
    else
        return deleteResponseFail(400, 'Delete Survery Response failed.', callback);
}
