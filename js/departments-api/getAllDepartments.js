'use strict';
const success = require('./responses').multiDepartmentSuccess;
const fail = require('./responses').DepartmentsFail;

module.exports.getAllDepartments = (esClient, event, context, callback) => {
    // If there are query parameters, something was probably misused
    if(event.queryStringParameters) {
        console.log(event);
        return fail(500, 'getAllDepartments: Extra parameters', callback)
    }

    var params = {
        index: 'departments',
        type: 'department',
        body: {}
    };

    var departments = [];

    esClient.search(params, function (err, data) {
        if (err)
            return fail(500, 'getAllDepartments failed. Error: ' + err, callback);
        else {
            console.log(data);

            var hits = data.hits.hits;

            // parse hits for departments
            for(let i = 0; i < hits.length; ++i){
                departments.push(hits[i]._source.department)
            }

            return success(200, departments, callback);
        }
    })
};
