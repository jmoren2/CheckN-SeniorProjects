'use strict';
const getSingleTagSuccess = require('./responses').singleTagSuccess;
const getTagFail = require('./responses').tagsFail;

module.exports.getTagByName = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.tag !== undefined && 
            event.pathParameters.tag !== null && 
            event.pathParameters.tag !== "") {
            console.log("Received proxy: " + event.pathParameters.tag);

            var tag = decodeURIComponent(event.pathParameters.tag);
            var params = {
                TableName: "tags",
                Key: {
                    "tag": tag 
                }
            };

    
            ddb.get(params, function(err, data) {
                if(err)
                    return getTagFail(500,'get Tag by tagId failed. Error: ' + err, callback);
                else {
                    if(data.Item == null)
                        return getTagFail(404, 'No Tag Found', callback);
                    else
                        return getSingleTagSuccess(200, data.Item, callback);
                }
            });
        }
        else
            return getTagFail(400, 'get Tag by name failed.', callback);
    }
    else
        return getTagFail(400,'get Tag by name failed', callback);
}