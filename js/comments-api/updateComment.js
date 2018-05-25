'use strict';
const moment = require('moment');
const success = require('./responses').singleCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.updateComment = (esClient, event, context, callback) => {
    if(event.pathParameters && event.pathParameters.commentId && event.body !== null && event.body !== undefined){
        var comment = JSON.parse(event.body);
        comment.commentId = event.pathParameters.commentId;
        var updateHistory = false;

        if(comment.content)
            updateHistory = true;

        // check for vote field, validate if present
        if (comment.vote) {
            let vote = comment.vote.toLowerCase();
            if (!(vote === 'positive' || vote === 'negative' || vote === 'neutral'))
                delete comment.vote;
            else
                comment.vote = vote;
        }

        console.log("Updating the content of a Comment...");
        if(updateHistory || comment.vote)
            return getOriginal(esClient, comment, callback);
        else
            return update(esClient, comment, callback);
    }
    else{
        return fail(500,'Comment updated failed. Error: undefined or empty JSON body', callback )
    }
};

function update(esClient, comment, callback){
    let params = {
        index: 'comments',
        type: 'comment',
        id: comment.commentId,
        body: {doc: comment}
    };

    esClient.update(params, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            return fail(500, 'Update Comment Content failed. Error: ' + error, callback)
        } else {
            console.log('data: ' + JSON.stringify(data));
            return success(200, data, callback)
        }
    });
}

function updateVote(esClient, comment, old, callback){
    let vote = comment.vote;
    let oldVote = old.vote;
    if(vote && oldVote && (vote !== oldVote)) {
        // construct object with string as key so we can upsert if value not initialized
        let temp = {};
        temp[vote] = 1;
        let params = {};
        if (old.parentId) {
            params = {
                index: 'comments',
                type: 'comment',
                id: old.parentId
            }
        }
        else {
            params = {
                index: 'posts',
                type: 'post',
                id: old.postId
            }
        }
        params.body = {
            script: 'ctx._source.voteCounts.' + vote + ' += 1;' +
            'ctx._source.voteCounts.' + oldVote + ' -= 1',
            upsert: {
                voteCounts: temp
            }
        };

        console.log('vote update params: ' + JSON.stringify(params));
        esClient.update(params, function (error, data) {
            if (error) {
                console.log('Comment update failed to update votecount. error: ' + JSON.stringify(error));
                return fail(400, error, callback);
            }
            else {
                console.log('data: ' + JSON.stringify(data));
                return success(200, comment, callback);
            }
        });
    }
}

function updateHistory(esClient, comment, old, callback){
    // pack up old values to add to history
    let edit = {};
    if(comment.content !== old.content || (comment.vote && comment.vote !== old.vote)){
        if(comment.content)
            edit.content = comment.content;
        else
            edit.content = old.content;
        if(comment.vote)
            edit.vote = comment.vote;
        else
            edit.vote = old.vote;
        edit.timestamp = moment().toISOString();
        if(old.history)
            comment.history = old.history;
        else
            comment.history = [];
        comment.history.unshift(edit);
    }
    return update(esClient, comment, callback);
}

function getOriginal(esClient, comment, callback){
    let params = {
        index: 'comments',
        type: 'comment',
        id: comment.commentId
    };

    esClient.get(params, function(error, data) {
        if(error) {
            console.log('error getting original comment: ' + JSON.stringify(error));
            return fail(500, 'Update Comment Content failed getting original. Error: ' + error, callback)
        }
        else{
            console.log('original: ' + JSON.stringify(data._source));
            let old = data._source;
            updateVote(esClient, comment, old, callback);
            return updateHistory(esClient, comment, old, callback)
        }
    });
}