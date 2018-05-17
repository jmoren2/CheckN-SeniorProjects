'use strict';

const success = require('./responses.js').singleUserSuccess;
const fail = require('./responses.js').usersFail;
module.exports.updateUser = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var body = JSON.parse(event.body);
        var params = {
            index: 'users',
            type: 'user',
            id: body.userId,
            body: body
        };

        esClient.update(params, function(error, data) {
          if(error)
            fail(500, 'Update User failed. Error: ' + error, callback);
          else
            success(201, data, callback)
        });
    }
    else{
        fail(500,'User updated failed. Error: JSON body is empty or undefined', callback);
    }
};