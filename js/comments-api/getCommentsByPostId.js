'use strict';
const multiCommentSuccess = require('./responses').multiCommentSuccess;
const getCommentsFail = require('./responses').CommentsFail;

module.exports.getCommentsByPostId = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);
            var postId = event.pathParameters.postId;
            var params = {
                TableName: "comments",
                FilterExpression: "#postId = :postId",
                ExpressionAttributeNames: {
                    "#postId": "postId",
                },
                ExpressionAttributeValues: {
                    ":postId": postId
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.scan(params, function(err, data) {
                if(err)
                    return getCommentsFail(500,'get Comments by postId failed. Error: ' + err, callback);
                else
                    return multiCommentSuccess(200, data.Items, callback);
            });
        }
        else
            return getCommentsFail(400, 'get Comments by postId failed.', callback);
    }
    else
        return getCommentsFail(400,'get Comments by postId failed', callback);
}