'use strict';
const getSingleTagSuccess = require('./responses').singleTagSuccess;
const getTagFail = require('./responses').tagsFail;

module.exports.getTagById = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.tagId !== undefined && 
            event.pathParameters.tagId !== null && 
            event.pathParameters.tagId !== "") {
            console.log("Received proxy: " + event.pathParameters.tagId);

            var tagId = event.pathParameters.tagId;
            var params = {
                TableName: "tags",
                Key: {
                    "tagId": tagId 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getTagFail(500,'get Tag by tagId failed. Error: ' + err, callback);
                else
                    return getSingleTagSuccess(200, data.Item, callback);
            });
        }
        else
            return getTagFail(400, 'get Tag by tagId failed.', callback);
    }
    else
        return getTagFail(400,'get Tag by tagId failed', callback);
}