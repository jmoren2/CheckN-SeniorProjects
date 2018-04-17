'use strict';
const success = require('./responses.js').deletePostSuccess;
const fail = require('./responses.js').postsFail;

module.exports.deletePost = (ddb, event, context, callback) => {
    var id = "-1";

    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);
            id = event.pathParameters.postId;
        }
    }

    var params = {
        TableName: "posts",
        Key: {
            "postId" : id
        }
    };

    console.log("Attempting a conditional delete...");
    
    ddb.delete(params, function(err, data) {
        if(err)
            return fail(500, 'Delete Post failed. Error: ' + err, callback);
        else
            return success(callback);
    });
}
