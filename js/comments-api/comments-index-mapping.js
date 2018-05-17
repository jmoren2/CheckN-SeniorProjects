'use strict';

var mapping = {
  "properties": {
    "content": { "type": "text" },
    "userId": { "type": "keyword" },
    "commentId": { "type": "keyword" },
    "postId": { "type": "keyword" },
    "anonymous": { "type": "boolean" },
    "voteCounts": {
      "type": "nested",
      "properties": {
        "positive": { "type": "integer" },
        "negative": { "type": "integer" },
        "neutral": { "type": "integer" }
      }
    },
    "history": {
      "type": "nested",
      "properties": {
        "content": { "type": "text" },
        "timestamp": { "type": "text" }
      }
    }
  }
};

module.exports.mapIndexComments = async (esClient, event, context, callback) => {
    var options = {
        index: 'comments',
        type: 'comment',
        body: mapping
    };
    var data;

    try {
        await esClient.indices.delete({index: 'comments'});
        data = await esClient.indices.putMapping(options);
    } catch (error) {
        console.log(error);
        return fail(500, error, callback);
    }
    
    console.log(data);
    return success(data, callback);
};

function fail(code, msg, callback) {
    return callback(null, {
        statusCode: code,
        body: {
            error: msg
        }
    });
}

function success(post, callback) {
    return callback(null, {
        statusCode: 200,
        body: {
            data: post
        }
    });
}