'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../comments-api/responses').CommentsFail;
const success = require('../comments-api/responses').singleCommentSuccess;


module.exports.createComment = (ddb, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {

        var body = JSON.parse(event.body);

        if(body.postId != event.pathParameters.postId){
            var failMessage = {message: 'The postId being sent does not match the postId in the path parameters'};
            fail(404, failMessage, callback );
        }
       
        body.commentId = uuid.v4();
        var now = moment().toISOString();
        body.timestamp = now;
    
        var comment = {
            Item: body,
            TableName: 'comments'
    
        }
        
        ddb.put(comment, function(error, data) {
            if(error)
            {
                var failMessage = {message: 'Failed to add comment. Error: ' + error};

                fail(500, failMessage, callback ); 

            }
            else
            {

                success(200, comment, callback);
            }

          });
    
    
        }
        else
        {
            var creationFail = {message: 'Comment creation failed. Error: ' + error};

            fail(500, creationFail, callback ); 
      }
}