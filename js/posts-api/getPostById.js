'use strict';

module.exports.getPostById = (ddb, event, context, callback) => {
    var response = 0;
    console.log('parameter content: ' + event.pathParameters.postId);
    ddb.get({TableName: 'posts', Key: {'postId': event.pathParameters.postId}}, function(error, data) {
        if(error)
            response = {
                statusCode: 500,
                message: JSON.stringify({message: 'getPostById failed. Error: ' + error})
            };
        else
            console.log('response: ' + JSON.stringify(data));
            response = {
                statusCode: 200,
                body: JSON.stringify({post: data.Item})
            };
        return callback(null, response);
    });
}