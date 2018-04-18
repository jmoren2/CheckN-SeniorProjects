'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../comments-api/responses').CommentsFail;
const success = require('../comments-api/responses').singleCommentSuccess;

module.exports.createComment = (ddb, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {

        var body = JSON.parse(event.body);
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
            //   callback(null, {
            //     statusCode: 500,
            //     body: JSON.stringify({message: 'Comment creation failed. Error: ' + error})
            //   });

            }
            else
            {
                //var successMessage = {message: 'Comment Created!'};

                success(200, commment, callback);
            }
            //   callback(null, {
            //     statusCode: 200,
            //     body: JSON.stringify({message: 'Comment Created!'})
            //   });
          });
    
    
        }
        else
        {
            var creationFail = {message: 'Comment creation failed. Error: ' + error};

            fail(500, creationFail, callback ); 
      }
}