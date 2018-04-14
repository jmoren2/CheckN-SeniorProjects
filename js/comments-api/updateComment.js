'use strict';
const moment = require('moment');

module.exports.updateComment = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "comments";
        var item = JSON.parse(event.body);
        var updatedTimeStamp = moment().toISOString();
        console.log(item);
        var postId = event.pathParameters.postId
        var commentId = event.pathParameters.commentId
        console.log(postId)
        var params = {
            TableName: tableName,
            Key:{
                "commentId": commentId
            },
        UpdateExpression: "set content = :content, #time =:timestamp, userId = :userId, positiveVoters = :positiveVoters, neturalVoters = :neutralVoters , negativeVoters = :negativeVoters",
        ExpressionAttributeValues:{
            ":content":item.content,
            ":timestamp":updatedTimeStamp,
            ":userId" : item.userId,
            ":positiveVoters" : item.positiveVoters,
            ":neutralVoters" : item.neutralVoters,
            ":negativeVoters" : item.negativeVoters
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