'use strict';
const success = require('./responses.js').singleTagSuccess;
const fail = require('./responses.js').tagsFail;
module.exports.updateTag = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "tags";
        var item = JSON.parse(event.body);
        var tagId = event.pathParameters.tagId
        var params = {
            TableName: tableName,
            Key:{
                "tagId": tagId
            },
        UpdateExpression: "set tagName = :tagName",
        ExpressionAttributeValues:{
            ":tagName":item.tagName,
        },   
        ReturnValues:"UPDATED_NEW"
        };

    ddb.update(params, function(error, data) {
      if(error)
        fail(500, 'Update Tag Content failed. Error: ' + error, callback)
      else
        success(201, data, callback)
    });
    }
    else{
        fail(500,'Tag updated failed. Error: JSON body is empty or undefined', callback);
    }
}