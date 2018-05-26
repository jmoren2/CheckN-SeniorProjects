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
        comment.voteCounts = {
            positive: 0,
            negative: 0,
            neutral: 0
        };

        // validate vote field
        if (comment.vote) {
            let vote = comment.vote.toLowerCase();
            if (!(vote === 'positive' || vote === 'negative' || vote === 'neutral'))
                delete comment.vote;
            else
                comment.vote = vote;
        }

        // first history entry
        var history = {};
        if(comment.content)
            history.content = comment.content;
        if(comment.vote)
            history.vote = comment.vote;
        history.timestamp = comment.timestamp;

        comment.history = [history];

        return getPostPermissions(esClient, comment, callback);
    }
    else {
        let error = 'Comment creation failed. error: body empty';
        console.log(error);
        return fail(400, error, callback);
    }
};

function getPostPermissions(esClient, comment, callback){
    let params = {
        index: 'posts',
        type: 'post',
        id: comment.postId
    };

    esClient.get(params, function(error, data){
        if(error){
            console.log('Comment creation failed to get parent post. error: ' + JSON.stringify(error));
            return fail(400, error, callback);
        }
        else{
            comment.visibilityLevel = data._source.visibilityLevel;
            return create(esClient, comment, callback);
        }
    })
}

function updateVote(esClient, comment, callback){
    let vote = comment.vote;
    if(vote){
        // update parent comment or post if not nested
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
            script: 'ctx._source.voteCounts.' + vote + ' += 1'
        };

        console.log('vote update params: ' + JSON.stringify(params));
        esClient.update(params, function(error, data){
            if(error){
                console.log('Comment creation failed to update votecount. error: ' + JSON.stringify(error));
                return fail(400, error, callback);
            }
            else{
                console.log('data: ' + JSON.stringify(data));
                return success(200, comment, callback);
            }
        })
    }
    else {
        console.log('data: ' + JSON.stringify(data));
        return success(200, comment, callback);
    }
}

function create(esClient, comment, callback){
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
            if(comment.vote){
                return updateVote(esClient, comment, callback);
            }
            else {
                console.log('data: ' + JSON.stringify(data));
                return success(200, comment, callback);
            }
        }
    });
}