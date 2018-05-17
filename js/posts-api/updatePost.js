'use strict';
const moment = require('moment');
const response = require('./responses.js').singlePostSuccess
const fail = require('./responses').postsFail
module.exports.updatePost = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "posts";
        var item = JSON.parse(event.body);
        var updatedTimeStamp = moment().toISOString();
        console.log('item: ' + JSON.stringify(item));
        var postId = event.pathParameters.postId
        console.log('postId: ' + postId)
        var params = {
            TableName: tableName,
            Key:{
                "postId": postId
            },
        UpdateExpression: "set content = :content, #time =:timestamp,  title = :title, userId = :userId, pinnedId = :pinnedId, visibilityLevel = :visibilityLevel, #state = :state, voteCounts = :voteCounts",
        ExpressionAttributeValues:{
            ":content":item.content,
            ":timestamp":updatedTimeStamp,
            ":title" : item.title,
            ":userId" : item.userId,
            ":pinnedId" : item.pinnedId,
            ":visibilityLevel" :item.visibilityLevel,
            ":state" : item.state,
            ":voteCounts" : item.voteCounts
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
        fail(500, 'Update Post Content failed. Error: ' + error, callback)
      else
        response(201, data, callback)
    });
    }
    else{
        fail(500,'Post content updated failed. Error: JSON body is empty or undefined', callback);
    }
}
