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
                index: 'comments',
                type: 'comment',
                id: id
            }

            console.log("Attempting a conditional delete...");

            esClient.delete(params, function (error, data) {
                if(error) {
                    console.log(error);
                    return deleteCommentFail(400, error, callback);
                }
                console.log('data: ' + JSON.stringify(data));
                deleteCommentSuccess(callback);
            });
        }
        else
            return deleteCommentFail(400, 'Delete Comment failed. Bad path parameters.', callback);
    }
    else
        return deleteCommentFail(400, 'Delete Comment failed. No Path parameters given.', callback);
}
