'use strict';
const deleteRoleFail = require('./responses').RolesFail;
const deleteRoleSuccess = require('./responses').deleteRoleSuccess;

module.exports.deleteRole = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.role !== undefined && 
            event.pathParameters.role !== null && 
            event.pathParameters.role !== "") {
            
            var role = event.pathParameters.role;
            var params = {
                index: 'roles',
                type: 'role',
                id: role
            };
    
            esClient.delete(params, function(err, data) {
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
};