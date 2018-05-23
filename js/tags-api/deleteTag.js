'use strict';
const deleteTagSuccess = require('./responses').deleteTagSuccess;
const deleteTagFail = require('./responses').tagsFail;

module.exports.deleteTag = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.tag !== undefined && 
            event.pathParameters.tag !== null && 
            event.pathParameters.tag !== "") {
            
            var name = event.pathParameters.tag;
            var params = {
                TableName: "tags",
                Key: {
                    "tag" : name
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteTagFail(500, 'Delete Tag failed. Error: ' + err, callback);
                else
                    return deleteTagSuccess(callback);
            });
        }
        else
            return deleteTagFail(400, 'Delete Tag failed.', callback);
    }
    else
        return deleteTagFail(400, 'Delete Tag failed.', callback);
}
