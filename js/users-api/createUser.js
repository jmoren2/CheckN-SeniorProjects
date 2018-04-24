'use strict';

const uuid = require('uuid');
const success = require('./responses.js').singleUserSuccess;
const fail = require('./responses.js').usersFail;

module.exports.createUser = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.userId = uuid.v4();
    

    var user = {
        Item: body,
        TableName: 'users'

    }
    
    ddb.put(user, function(error, data) {
      if(error) {
        return fail(500, 'User creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'User creation failed. Error: ' + error, callback)
  } 
}