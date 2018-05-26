'use strict';
const deleteDepartmentFail = require('./responses').DepartmentsFail;
const deleteDepartmentSuccess = require('./responses').deleteDepartmentSuccess;

module.exports.deleteDepartment = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.department !== undefined && 
            event.pathParameters.department !== null && 
            event.pathParameters.department !== "") {
            
            var name = event.pathParameters.department;
            var params = {
                index: 'departments',
                type: 'department',
                id: name
            };

            console.log("Attempting a conditional delete...");
    
            esClient.delete(params, function(err, data) {
                if(err)
                    return deleteDepartmentFail(500, 'Delete Department failed. Error: ' + err, callback);
                else
                    return deleteDepartmentSuccess(callback);
            });
        }
        else
            return deleteDepartmentFail(400, 'Delete Department failed.', callback);
    }
    else
        return deleteDepartmentFail(400, 'Delete Department failed.', callback);
};
