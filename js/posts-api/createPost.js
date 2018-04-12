'use strict';

const uuid = require('uuid');
const moment = require('moment');

module.exports.createPost = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.postId = uuid.v4();
    var now = moment().toISOString();
    body.timestamp = now;

    var post = {
        Item: body,
        TableName: 'posts'

    }
    
    ddb.put(post, function(error, data) {
        if(error)
          callback(null, {
            statusCode: 500,
            body: JSON.stringify({message: 'Post creation failed. Error: ' + error})
          });
        else
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({message: 'Post Created!'})
          });
      });


    }
    else
    {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({message: 'Post creation failed. Error: ' + error})
    });
  }
    
}
