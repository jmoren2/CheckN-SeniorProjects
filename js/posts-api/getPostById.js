'use strict';
const success = require('./responses.js').singlePostSuccess;
const fail = require('./responses.js').postsFail;

module.exports.getPostById = (ddb, event, context, callback) => {
    var response = 0;
    console.log('parameter content: ' + event.pathParameters.postId);
    ddb.get({TableName: 'posts', Key: {'postId': event.pathParameters.postId}}, function(error, data) {
        if(error)
            return fail(500, 'getPostById failed. Error: ' + error, callback);
        else
            return success(200, data.Item, callback);
     });
}