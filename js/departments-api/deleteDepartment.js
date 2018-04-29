'use strict';
const deleteDepartmentFail = require('./responses').DepartmentsFail;
const deleteDepartmentSuccess = require('./responses').deleteDepartmentSuccess;

module.exports.deleteDepartment = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.departmentId !== undefined && 
            event.pathParameters.departmentId !== null && 
            event.pathParameters.departmentId !== "") {
            
            var id = event.pathParameters.departmentId;
            var params = {
                TableName: "departments",
                Key: {
                    "departmentId" : id
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
