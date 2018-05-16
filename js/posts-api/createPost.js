'use strict';

const uuid = require('uuid');
const moment = require('moment');
const success = require('./responses.js').singlePostSuccess;
const fail = require('./responses.js').postsFail;

module.exports.createPost = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);

    if(!body.hasOwnProperty('title') || body.title === undefined){
      return fail(404, 'Title is missing', callback);
    }
    if(!body.hasOwnProperty('userId') || body.userId === undefined){
      return fail(404, 'userId is missing', callback);
    }
    if(!body.hasOwnProperty('state') || body.state === undefined){
      return fail(404, 'State is missing', callback);
    }
    if(!body.hasOwnProperty('content') || body.content === undefined){
      return fail(404, 'Content is missing', callback);
    }
    
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
    return fail(500, 'Post creation failed.', callback)
  }
}
