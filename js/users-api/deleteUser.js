'use strict';
const deleteUserSuccess = require('./responses').deleteUserSuccess;
const deleteUserFail = require('./responses').usersFail;

module.exports.deleteUser = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.userId !== undefined && 
            event.pathParameters.userId !== null && 
            event.pathParameters.userId !== "") {
            
            var id = event.pathParameters.userId;
            var params = {
                index: 'users',
                type: 'user',
                id: id
            };

            console.log("Attempting a conditional delete...");

            esClient.delete(params, function (error, data) {
                if(error) {
                    console.log(error);
                    return deleteUserFail(500, 'Delete user failed. Error: ' + error, callback);
                }
                else {
                    console.log('data: ' + JSON.stringify(data));
                    return deleteUserSuccess(callback);
                }
            });
        }
        else
            return deleteUserFail(400, 'Delete user failed.', callback);
    }
    else
        return deleteUserFail(400, 'Delete user failed.', callback);
};