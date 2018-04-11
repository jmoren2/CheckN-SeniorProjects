'use strict';
let uuid = require('node-uuid');

module.exports.createPost = (ddb, event, context, callback) => {


  if (event.body !== null && event.body !== undefined) {
        var eventBody = JSON.parse(event.body);
        eventBody.id = uuid.v4();


        var post = {
            TableName: 'posts',
            Item: body
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
        callback(null,{
            statusCode: 500,
            body: JSON.stringify({message: 'Create Post Failed.'})
        });
}
