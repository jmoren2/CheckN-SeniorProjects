'use strict';
const getSingleDepartmentSuccess = require('./responses').singleDepartmentSuccess;
const getDepartmentFail = require('./responses').DepartmentsFail;

module.exports.getDepartment = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.department !== undefined && 
            event.pathParameters.department !== null && 
            event.pathParameters.department !== "") {
            console.log("Received proxy: " + event.pathParameters.department);

            var name = decodeURIComponent(event.pathParameters.department);
            var params = {
                TableName: "departments",
                Key: {
                    "department": name 
                }
            };
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getDepartmentFail(500,'get Department by name failed. Error: ' + err, callback);
                else {
                    if(data.Item == null)
                        return getDepartmentFail(404, 'No Department Found', callback);
                    else
                        return getSingleDepartmentSuccess(200, data.Item, callback);
                }
            });
        }
        else
            return getDepartmentFail(400, 'get Department by name failed.', callback);
    }
    else
        return getDepartmentFail(400,'get Department by name failed', callback);
}