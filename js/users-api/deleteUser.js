'use strict';
const deleteUserSuccess = require('./responses').deleteUserSuccess;
const deleteUserFail = require('./responses').usersFail;

module.exports.deleteUser = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.userId !== undefined && 
            event.pathParameters.userId !== null && 
            event.pathParameters.userId !== "") {
            
            var id = event.pathParameters.userId;
            var params = {
                TableName: "users",
                Key: {
                    "userId" : id
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteUserFail(500, 'Delete user failed. Error: ' + err, callback);
                else
                    return deleteUserSuccess(callback);
            });
        }
        else
            return deleteUserFail(400, 'Delete user failed.', callback);
    }
    else
        return deleteUserFail(400, 'Delete user failed.', callback);
}
