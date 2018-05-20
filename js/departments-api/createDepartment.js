'use strict';


const success = require('./responses.js').singleDepartmentSuccess;
const fail = require('./responses.js').DepartmentsFail;

module.exports.createDepartment = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);

    var params = {
      index: 'departments',
      type: 'department',
      body: body
    };
    
    esClient.create(params, function(error, data) {
      if(error) {
        return fail(500, 'Department creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Department creation failed.', callback)
  } 
};