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

            var params = {
               index: 'posts',
               type: 'post',
               id: id
            };

            esClient.get(params, function(err, data) {
                if(err) {
                    console.log('error: ' + err);
                    return fail(500,'get post by postId failed. Error: ' + err, callback);
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    var post = data._source;
                    var paramsUser = {
                        index: 'users',
                        type: 'user',
                        id: post.userId
                    };
                    esClient.get(paramsUser, function(err2, data2){
                        if(err2){
                            console.log('getPostById get user error: ' + err2);
                            post.userName = 'unknown user';
                        } else {
                            console.log('data: ' + JSON.stringify(data2));
                            var user = data2._source;
                            if(data2.found == false || user === undefined || user === null || user === "")
                                post.userName = 'unknown user'
                            else
                                post.userName = user.firstName + ' ' + user.lastName;
                        }
                        return success(200, post, callback);
                    });
                }
            });

        }
        else
            return fail(400, 'get post by postId failed.', callback);
    }
    else
        return fail(400,'get post by postId failed', callback);
};