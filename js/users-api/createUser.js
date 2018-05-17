'use strict';

const uuid = require('uuid');
const success = require('./responses.js').singleUserSuccess;
const fail = require('./responses.js').usersFail;

module.exports.createUser = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var user = JSON.parse(event.body);
    user.userId = uuid.v4();
    

    var params = {
      index: 'users',
      type: 'user',
      id: user.userId,
      body: user
    };
    
    esClient.create(params, function(error, data) {
      if(error) {
          console.log('User creation failed. Error: ' + JSON.stringify(error));
          return fail(400, error, callback);
      } else {
          console.log('data: ' + JSON.stringify(data));
          return success(200, data, callback);
      }
    });
  } else {
    return fail(500, 'User creation failed.' , callback)
  } 
};