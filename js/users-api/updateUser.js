'use strict';

const success = require('./responses.js').singleUserSuccess;
const fail = require('./responses.js').usersFail;
module.exports.updateUser = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var tableName = "users";
        var item = JSON.parse(event.body);
        var userId = event.pathParameters.userId
        var params = {
            TableName: tableName,
            Key:{
                "userId": userId
            },
        UpdateExpression: "set firstName = :firstName, lastName = :lastName, email = :email, posts = :posts, comments = :comments, votes = :votes, permissions.department = :department, permissions.role = :role, permissions.department = :location",
        ExpressionAttributeValues:{
            ":firstName":item.firstName,
            ":lastName" : item.lastName,
            ":email" : item.email,
            ":posts" : item.posts,
            ":comments" :item.comments,
            ":votes" : item.votes,
            ":department" :item.permissions.department,
            ":role" : item.permissions.role,
            ":location" : item.permissions.department
        },   
        ReturnValues:"UPDATED_NEW"
        };

    ddb.update(params, function(error, data) {
      if(error)
        fail(500, 'Update User failed. Error: ' + error, callback)
      else
        success(201, data, callback)
    });
    }
    else{
        fail(500,'User updated failed. Error: JSON body is empty or undefined', callback);
    }
}