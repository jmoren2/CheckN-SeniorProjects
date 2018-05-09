'use strict';
const success = require('./responses').singlePostSuccess;
const fail = require('./responses').postsFail;

module.exports.getPostById = (esClient, event, context, callback) => {
    console.log('parameter content: ' + JSON.stringify(event.pathParameters));

    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);

            var id = event.pathParameters.postId;
            // var params = {
            //     TableName: "posts",
            //     Key: {
            //         "postId": id 
            //     }
            // };

            var params = {
               index: 'posts',
               type: 'post',
               id: id
            }

            esClient.get(params, function(err, data) {
                if(err) {
                    console.log('error: ' + err);
                    return fail(500,'get post by postId failed. Error: ' + err, callback);
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    return success(200, data._source, callback);
                }
            });
        }
        else
            return fail(400, 'get post by postId failed.', callback);
    }
    else
        return fail(400,'get post by postId failed', callback);
}