'use strict';
const singleCommentSuccess = require('./responses').singleCommentSuccess;
const getCommentsFail = require('./responses').CommentsFail;

module.exports.getCommentById = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.commentId !== undefined && 
            event.pathParameters.commentId !== null && 
            event.pathParameters.commentId !== "") {
            console.log("Received proxy: " + event.pathParameters.commentId);
            var commentId = event.pathParameters.commentId;

            var params = {
                index: 'comments',
                type: 'comment',
                id: commentId
            };
    
            esClient.get(params, function (err, data) {
                if(err) {
                    return getCommentsFail(500,'get Comment by commentId failed. Error: ' + err, callback);
                } else {
                    return singleCommentSuccess(200, data._source, callback);
                }
            });

        } else {
            return getCommentsFail(400, 'get Comment by commentId failed. Bad path parameters.', callback);
        }
    } else {
        return getCommentsFail(400,'get Comment by commentId failed. No path parameters.', callback);
    }
};