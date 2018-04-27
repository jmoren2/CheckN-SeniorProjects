'use strict';
const getSingleUserSuccess = require('./responses').singleUserSuccess;
const getUserFail = require('./responses').usersFail;

module.exports.getUserById = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.userId !== undefined && 
            event.pathParameters.userId !== null && 
            event.pathParameters.userId !== "") {
            console.log("Received proxy: " + event.pathParameters.userId);

            var userId = event.pathParameters.userId;
            var params = {
                TableName: "users",
                Key: {
                    "userId": userId 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getUserFail(500,'get user by userId failed. Error: ' + err, callback);
                else
                    return getSingleUserSuccess(200, data.Item, callback);
            });
        }
        else
            return getUserFail(400, 'get user by userId failed.', callback);
    }
    else
        return getUserFail(400,'get user by userId failed', callback);
}