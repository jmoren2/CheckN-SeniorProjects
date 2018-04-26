'use strict';

const uuid = require('uuid');
const moment = require('moment');
const success = require('./responses.js').singleCommentSuccess;
const fail = require('./responses.js').CommentsFail;

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
      if(error) {
        return fail(500, 'Post creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Post creation failed. Error: ' + error, callback)
  } 
}
