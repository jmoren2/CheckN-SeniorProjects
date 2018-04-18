'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../posts-api/responses').postsFail;
const success = require('../posts-api/responses').singlePostSuccess;

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
        if(error){

          //var body = JSON.stringify({message: 'Post creation failed. Error: ' + error}); 
          var body = {message: 'Failed to add post. Error: ' + error};

          fail(500, body, callback );  
        
        // callback(null, {
          //   statusCode: 500,
          //   body: JSON.stringify({message: 'Post creation failed. Error: ' + error})
          // });

        }
        else
          {
          //var body = JSON.stringify({message: 'Post Created!'});
          //var body = {message: 'Post Created!'};

          success(200, post, callback);
          // callback(null, {
          //   statusCode: 200,
          //   body: JSON.stringify({message: 'Post Created!'})
          // });

          }
      });


    }
    else
    {
      var body = {message: 'Post creation failed. Error: ' + error};

      fail(500, body, callback );  
    
  }
    
}
