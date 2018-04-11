'use strict';

module.exports.getPostById = (ddb, event, context, callback) => {
    var response = 0;
    ddb.get({TableName: 'posts', Key: {'id': event.pathParameters.postId}}, function(error, data) {
        if(error)
            response = {
                statusCode: 500,
                body: JSON.stringify({message: 'getPostById failed. Error: ' + error})
            };
        else
            response = {
                statusCode: 200,
                body: JSON.stringify({post: data.Item})
            };
    });
    callback(null, response);
}