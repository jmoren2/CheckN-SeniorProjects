'use strict';
const getSingleRoleSuccess = require('./responses').singleRoleSuccess;
const getRoleFail = require('./responses').RolesFail;

module.exports.getRole = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.role !== undefined && 
            event.pathParameters.role !== null && 
            event.pathParameters.role !== "") {
            console.log("Received proxy: " + event.pathParameters.role);

            var role = decodeURIComponent(event.pathParameters.role);
            var params = {
                index: 'roles',
                type: 'role',
                id: role
            };
    
            esClient.get(params, function(err, data) {
                if(err)
                    return getRoleFail(500,'get Role by role failed. Error: ' + err, callback);
                else {
                    if(data._source == null)
                        return getRoleFail(404,'No Role Found',callback);
                    else
                        return getSingleRoleSuccess(200, data._source, callback);
                }
            });
        }
        else
            return getRoleFail(400, 'get Role by role failed.', callback);
    }
    else
        return getRoleFail(400,'get Role by role failed', callback);
};