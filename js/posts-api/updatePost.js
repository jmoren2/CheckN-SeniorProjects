'use strict';
const moment = require('moment');

module.exports.updatePost = (ddb, event, context, callback) => {
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
        UpdateExpression: "set content = :content, #time =:timestamp,  title = :title, userId = :userId, pinnedId = :pinnedId, visibilityLevel = :visibilityLevel, #state = :state, positiveVoters = :positiveVoters, neturalVoters = :neutralVoters , negativeVoters = :negativeVoters",
        ExpressionAttributeValues:{
            ":content":item.content,
            ":timestamp":updatedTimeStamp,
            ":title" : item.title,
            ":userId" : item.userId,
            ":pinnedId" : item.pinnedId,
            ":visibilityLevel" :item.visibilityLevel,
            ":state" : item.state,
            ":positiveVoters" : item.positiveVoters,
            ":neutralVoters" : item.neutralVoters,
            ":negativeVoters" : item.negativeVoters
        },
        ExpressionAttributeNames: {
            "#time": "timestamp",
            "#state" : "state"
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
