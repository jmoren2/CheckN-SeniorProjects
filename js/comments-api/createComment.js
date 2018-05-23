'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../comments-api/responses').CommentsFail;
const success = require('../comments-api/responses').singleCommentSuccess;

module.exports.createComment = (esClient, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        var comment = JSON.parse(event.body);
        comment.commentId = uuid.v4();
        comment.timestamp = moment().toISOString();
        var vote;

        // validate vote field
        if (comment.vote) {
            vote = comment.vote;
            if (!(vote === 'positive' || vote === 'negative' || vote === 'neutral')) {
                vote = '';
                delete comment.vote;
            }
        }

        var params = {
            index: 'comments',
            type: 'comment',
            id: comment.commentId,
            body: comment
        };

        esClient.create(params, function(error, data) {
            if(error) {
                console.log('Comment creation failed. error: ' + JSON.stringify(error));
                return fail(400, error, callback);
            } else {
                if(vote){
                    // construct json with string as key so we can upsert if value not initialized
                    var temp = {};
                    temp[vote] = 1;
                    var params = {};
                    if(comment.parentId){
                        params = {
                            index: 'comments',
                            type: 'comment',
                            id: comment.parentId
                        }
                    }
                    else {
                        params = {
                            index: 'posts',
                            type: 'post',
                            id: comment.postId
                        }
                    }
                    params.body = {
                        script: 'ctx._source.voteCounts.' + vote + ' += 1',
                        upsert: {
                            voteCounts: temp
                        }
                    };

                    console.log('vote update params: ' + JSON.stringify(params));
                    esClient.update(params, function(error, data2){
                        if(error){
                            console.log('Comment creation failed to update votecount. error: ' + JSON.stringify(error));
                            return fail(400, error, callback);
                        }
                        else{
                            console.log('data: ' + JSON.stringify(data2));
                            return success(200, comment, callback);
                        }
                    })
                }
                else {
                    console.log('data: ' + JSON.stringify(data));
                    return success(200, comment, callback);
                }
            }
        });
    }
    else {
        let error = 'Comment creation failed. error: body empty';
        console.log(error);
        return fail(400, error, callback);
    }
};