'use strict';
const success = require('./responses').singleCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentById = (esClient, event, context, callback) => {
    // using postId as temporary hack until we do full deploy
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined &&
            event.pathParameters.postId !== null &&
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);
            var commentId = event.pathParameters.postId;

            var params = {
                index: 'comments',
                type: 'comment',
                id: commentId
            };

            var showUser = function(comment, callback) {
                params = {
                    index: 'users',
                    type: 'user',
                    id: comment.userId
                };

                esClient.get(params, function (err, data) {
                    if (err) {
                        console.log('getCommentById get user error: ' + JSON.stringify(err));
                        comment.userName = 'unknown user';
                    } else {
                        var user = data._source;
                        comment.userName = user.firstName + ' ' + user.lastName;
                    }
                    return success(200, comment, callback);
                });
            };

            esClient.get(params, function (err, data) {
                if(err) {
                    return fail(500,'get Comment by commentId failed. Error: ' + err, callback);
                } else {
                    return showUser(data._source, callback);
                }
            });

        } else {
            return fail(400, 'get Comment by commentId failed. Bad path parameters.', callback);
        }
    } else {
        return fail(400,'get Comment by commentId failed. No path parameters.', callback);
    }
};