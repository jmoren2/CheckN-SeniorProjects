'use strict';
const deleteDepartmentFail = require('./responses').DepartmentsFail;
const deleteDepartmentSuccess = require('./responses').deleteDepartmentSuccess;

module.exports.deleteDepartment = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.department !== undefined && 
            event.pathParameters.department !== null && 
            event.pathParameters.department !== "") {
            
            var name = event.pathParameters.department;
            var params = {
                TableName: "departments",
                Key: {
                    "department" : name
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
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
}
