'use strict';
const moment = require('moment');
const success = require('./responses').singleCommentSuccess;
const fail = require('./responses').CommentsFail;

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

    console.log("Updating a Comment...");
    ddb.update(params, function(error, data) {
      if(error)
        fail(500, 'Update Comment failed. Error: ' + error, callback)
      else
        success(201, data, callback)
    });
    }
    else{
        fail(500,'Comment updated failed. Error: undefined or empty JSON body', callback )
    }
}