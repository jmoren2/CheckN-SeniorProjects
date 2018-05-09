'use strict';

const uuid = require('uuid');
const moment = require('moment');
const success = require('./responses.js').singlePostSuccess;
const fail = require('./responses.js').postsFail;

module.exports.createPost = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.postId = uuid.v4();
    var now = moment().toISOString();
    body.timestamp = now;

    var post = {
        Item: body,
        TableName: 'posts'

    }

    var params = {
      index: 'posts',
      type: 'post',
      id: body.postId,
      body: body
    }

    esClient.create(params, function(error, data) {
      if(error) {
        console.log('error: ' + JSON.stringify(error));
        return fail(400, error, callback);
      } else {
        console.log('data: ' + JSON.stringify(data));
        return success(200, data, callback);
      }
    });
    
    // ddb.put(post, function(error, data) {
    //   if(error) {
    //     return fail(500, 'Post creation failed. Error: ' + error, callback);
    //   } else {
    //     console.log('data: ' + data);
    //     return success(200, body, callback);
    //   }
    // });
  } else {
    return fail(500, 'Post creation failed.', callback)
  }
}
