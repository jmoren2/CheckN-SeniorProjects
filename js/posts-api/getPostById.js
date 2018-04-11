'use strict';

module.exports.getPostById = (ddb, event, context, callback) => {
    ddb.scan({TableName: 'posts'}, function(error, data) {
        if(error)
          callback(null, {
            statusCode: 500,
            body: JSON.stringify({message: 'get posts failed. Error: ' + error})
          });
        else
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({posts: data.Items})
          });
      });
}
