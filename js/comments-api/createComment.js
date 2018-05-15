'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../comments-api/responses').CommentsFail;
const success = require('../comments-api/responses').singleCommentSuccess;
const getPost = require('../posts-api/getPostById').getPostById;
const updatePost = require('../posts-api/updatePost').updatePost;

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
                fail(500, failMessage, callback); 
            }
            else
            {
                getPost(ddb, event, context, function(err, data2){
                    if(err) {
                        var failMessage = {message: 'Failed to add comment. Error: ' + error};
                        fail(500, failMessage, callback);
                    } else {
                        console.log('data2: ' + JSON.stringify(data2));
                        var postBody = {};
                        var post = JSON.parse(data2.body).post;
                        console.log('comment: ' + JSON.stringify(comment));
                        console.log('post: ' + JSON.stringify(post));
                        if(comment.Item.vote === 'POSITIVE') {
                            if(post.positiveVotes)
                                postBody.positiveVotes = post.positiveVotes + 1;
                            else
                                postBody.positiveVotes = 1;
                        } else if(comment.Item.vote === 'NEUTRAL') {
                            if(post.neutralVotes)
                                postBody.neutralVotes = post.neutralVotes + 1;
                            else
                                postBody.neutralVotes = 1;
                        } else if(comment.Item.vote === 'NEGATIVE') {
                            if(post.negativeVotes)
                                postBody.negativeVotes = post.negativeVotes + 1;
                            else
                                postBody.negativeVotes = 1;
                        }
                        event.body = JSON.stringify(postBody);
                        updatePost(ddb, event, context, function(err, data3) {
                            if(err) {
                                var failMessage = {message: 'Failed to update post. Error: ' + error};
                                fail(500, failMessage, callback);
                            } else {
                                success(200, comment, callback);
                            }
                        });
                    }
                });
            }
          });
    
    
        }
        else
        {
            var creationFail = {message: 'Comment creation failed. Error: ' + error};

            fail(500, creationFail, callback ); 
      }
}