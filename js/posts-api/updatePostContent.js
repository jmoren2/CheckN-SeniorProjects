'use strict';
const moment = require('moment');

module.exports.updatePostContent = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "posts";
        var item = JSON.parse(event.body);
        var updatedTimeStamp = moment().toISOString();
        console.log(item);
        var postId = event.pathParameters.postId
        console.log(postId)
        var params = {
            TableName: tableName,
            Key:{
                "postId": postId
            },
        UpdateExpression: "set content = :content, #time =:timestamp",
        ExpressionAttributeValues:{
            ":content":item.content,
            ":timestamp":updatedTimeStamp
        },
        ExpressionAttributeNames: {
            "#time": "timestamp"
        },     
        ReturnValues:"UPDATED_NEW"
        };

    console.log("Updating the content of a Post...");
    ddb.update(params, function(error, data) {
      if(error)
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({message: 'Update Post Content failed. Error: ' + error})
        });
      else
        callback(null, {
          statusCode: 201,
          body: JSON.stringify({message: 'Post Content Updated.'})
        });
    });
    }
    else{
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({message: 'Post content updated failed. Error: ' + error})
        });
    }
}
