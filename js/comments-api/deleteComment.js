'use strict';
const deleteCommentSuccess = require('./responses').deleteCommentSuccess;
const deleteCommentFail = require('./responses').CommentsFail;

module.exports.deleteComment = (ddb, event, context, callback) => {
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
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteCommentFail(500, 'Delete Comment failed. Error: ' + err, callback);
                else
                    return deleteCommentSuccess(callback);
            });
        }
        else
            return deleteCommentFail(400, 'Delete Comment failed.', callback);
    }
    else
        return deleteCommentFail(400, 'Delete Comment failed', callback);
}
