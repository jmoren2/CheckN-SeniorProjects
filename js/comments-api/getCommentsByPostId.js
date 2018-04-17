'use strict';
const singleCommentSuccess = require('./responses').singleCommentSuccess;
const singleCommentFail = require('./responses').CommentsFail;

module.exports.getCommentsByPostId = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.commentId !== undefined && 
            event.pathParameters.commentId !== null && 
            event.pathParameters.commentId !== "") {
            console.log("Received proxy: " + event.pathParameters.commentId);
            var id = event.pathParameters.commentId;
            var params = {
                TableName: "comments",
                Key: {
                    "commentId" : id
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return singleCommentFail(500,'getCommentById failed. Error: ' + err, callback);
                else
                    return singleCommentSuccess(200,data.Item,callback);
            });
        }
        else
            return singleCommentFail(400, 'getCommentById failed.', callback);
    }
    else
        return singleCommentFail(400,'getCommentById failed', callback);
}