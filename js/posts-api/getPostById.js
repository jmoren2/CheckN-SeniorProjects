'use strict';
const success = require('./responses').singlePostSuccess;
const fail = require('./responses').postsFail;

module.exports.getPostById = (ddb, event, context, callback) => {
    console.log('parameter content: ' + JSON.stringify(event.pathParameters));

    ddb.get({
        TableName: 'posts', 
        Key: {
            "postId": event.pathParameters.postId 
        }
    }, function (error, data) {
        if(error) {
            console.log(error);
            return fail(500, error, callback);
        } else {
            console.log(data);
            return success(200, data.Item, callback);
        }
    });
}