'use strict';

module.exports.createPost = (ddb, event, context, callback) => {

    var post = {
        Item: JSON.parse(event.body),
        TableName: 'posts'

    }

    console.log(post);
    
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
