'use strict';
const deletePostSuccess = require('./responses').deletePostSuccess;
const deletePostFail = require('./responses.js').postsFail;

module.exports.deletePost = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);
            var id = event.pathParameters.postId;

            var params = {
                index: 'posts',
                type: 'post',
                id: id
            }

            console.log("Attempting a conditional delete...");

            esClient.delete(params, function (error, data) {
                if(error) {
                    console.log(error);
                    return deletePostFail(error);
                }
                console.log('data: ' + JSON.stringify(data));
                deletePostSuccess(callback);
            });
        }
        else
            return deletePostFail(400, 'Delete Post failed.', callback);
    }
    else
        return deletePostFail(400, 'Delete Post failed.', callback);
}
