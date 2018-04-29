'use strict';
const deleteRoleFail = require('./responses').RolesFail;
const deleteRoleSuccess = require('./responses').deleteRoleSuccess;

module.exports.deleteRole = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.roleId !== undefined && 
            event.pathParameters.roleId !== null && 
            event.pathParameters.roleId !== "") {
            
            var id = event.pathParameters.roleId;
            var params = {
                TableName: "roles",
                Key: {
                    "roleId" : id
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteRoleFail(500, 'Delete Role failed. Error: ' + err, callback);
                else
                    return deleteRoleSuccess(callback);
            });
        }
        else
            return deleteRoleFail(400, 'Delete Role failed.', callback);
    }
    else
        return deleteRoleFail(400, 'Delete Role failed.', callback);
}