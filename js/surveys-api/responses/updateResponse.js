'use strict';
const success = require('../responses').singleResponseSuccess;
const fail = require('../responses').singleResponseSuccess;
module.exports.updateResponse = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var body = JSON.parse(event.body);
        var responseId = event.pathParameters.responseId;
        var params = {
            index: 'responses',
            type: 'response',
            id: responseId,
            body: body
        };

        esClient.update(params, function(error, data) {
          if(error)
            fail(500, 'Update Responses failed. Error: ' + error, callback);
          else
            success(201, data._source, callback)
        });
    }
    else{
        fail(500,'Response updated failed. Error: JSON body is empty or undefined', callback);
    }
};