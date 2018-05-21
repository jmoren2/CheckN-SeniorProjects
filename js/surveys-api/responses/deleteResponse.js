'use strict';
const deleteResponseSuccess = require('../responses').deleteResponseSuccess;
const deleteResponseFail = require('../responses').ResponseFail;

module.exports.deleteResponse = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.responseId !== undefined && 
            event.pathParameters.responseId !== null && 
            event.pathParameters.responseId !== "") {
            
            var id = event.pathParameters.responseId;
            var params = {
                index: 'responses',
                type: 'response',
                id: id
            };

            console.log("Attempting a conditional delete...");
    
            esClient.delete(params, function(err, data) {
                if(err)
                    return deleteResponseFail(500, 'Delete Survey Response failed. Error: ' + err, callback);
                else
                    return deleteResponseSuccess(callback);
            });
        }
        else
            return deleteResponseFail(400, 'Delete Survey Response failed.', callback);
    }
    else
        return deleteResponseFail(400, 'Delete Survey Response failed.', callback);
};
