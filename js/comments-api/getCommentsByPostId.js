'use strict';
const success = require('./responses').multiCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentsByPostId = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);
            var postId = event.pathParameters.postId;

            var filter = {};
            filter.query.bool.must.match.postId = postId;

            esClient.search({
                index: 'comments',
                type: 'comment',
                body: filter
            }, function(error, data) {
                if(error) {
                    console.log('error: ' + JSON.stringify(error));
                    fail(400, error, callback);
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    success(200, data, callback);
                }
            });
        }
        else
            return fail(400, 'get Comments by postId failed.', callback);
    }
    else
        return fail(400,'get Comments by postId failed', callback);
};