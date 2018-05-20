'use strict';
const getSingleResponseSuccess = require('../responses').singleResponseSuccess;
const getResponseFail = require('../responses').ResponseFail;

module.exports.getResponseById = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.responseId !== undefined && 
            event.pathParameters.responseId !== null && 
            event.pathParameters.responseId !== "") {
            console.log("Received proxy: " + event.pathParameters.responseId);

            var id = event.pathParameters.responseId;
            var params = {
                index: 'responses',
                type: 'response',
                id: id
            };
    
            esClient.get(params, function(err, data) {
                if(err)
                    return getResponseFail(500,'get Response by Id failed. Error: ' + err, callback);
                else {
                    if(data._source == null)
                      return getResponseFail(404, 'No Response Found', callback);
                    else
                      return getSingleResponseSuccess(200, data._source, callback);
                }
            });
        }
        else
            return getResponseFail(400, 'get Response by Id failed.', callback);
    }
    else
        return getResponseFail(400,'get Response by Id failed', callback);
};