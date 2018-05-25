'use strict';

const success = require('./responses.js').singleUserSuccess;
const fail = require('./responses.js').usersFail;

module.exports.updateUser = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined && 
        event.pathParameters.userId !== undefined && 
        event.pathParameters.userId !== null) {

        var body = JSON.parse(event.body);
        body.userId = event.pathParameters.userId;

        var params = {
            index: 'users',
            type: 'user',
            id: body.userId,
            body: {doc: body}
        };

        esClient.update(params, function(error, data) {
          if(error)
            fail(500, 'Update User failed. Error: ' + error, callback);
          else
            success(201, body, callback)
        });
    }
    else{
        fail(500,'User update failed. Error: JSON body is empty or undefined', callback);
    }
};