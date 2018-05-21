'use strict';


const success = require('./responses.js').singleDepartmentSuccess;
const fail = require('./responses.js').DepartmentsFail;

module.exports.createDepartment = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {
    var body = JSON.parse(event.body);

    // only take department field
    var insert = body.department;

    var params = {
      index: 'departments',
      type: 'department',
      id: insert,
      body: {department: insert}
    };
    
    esClient.create(params, function(error, data) {
      if(error) {
        return fail(500, 'Department creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, params.body, callback);
      }
    });
  } else {
    return fail(500, 'Department creation failed.', callback)
  } 
};