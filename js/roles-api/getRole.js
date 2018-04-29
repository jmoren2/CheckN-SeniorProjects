'use strict';
const getSingleRoleSuccess = require('./responses').singleRoleSuccess;
const getRoleFail = require('./responses').RolesFail;

module.exports.getRole = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.roleId !== undefined && 
            event.pathParameters.roleId !== null && 
            event.pathParameters.roleId !== "") {
            console.log("Received proxy: " + event.pathParameters.roleId);

            var id = event.pathParameters.roleId;
            var params = {
                TableName: "roles",
                Key: {
                    "roleId": id 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getRoleFail(500,'get Role by roleId failed. Error: ' + err, callback);
                else
                    return getSingleRoleSuccess(200, data.Item, callback);
            });
        }
        else
            return getRoleFail(400, 'get Role by roleId failed.', callback);
    }
    else
        return getRoleFail(400,'get Role by roleId failed', callback);
}