'use strict';
const moment = require('moment');
const response = require('./responses.js').singlePostSuccess;
const fail = require('./responses').postsFail;
module.exports.updatePost = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined && event.pathParameters.postId !== undefined && 
        event.pathParameters.postId !== null) {
            
        var post = JSON.parse(event.body);
        post.postId = event.pathParameters.postId;

        if(post.title || post.content || post.tags)
            return getOriginal(esClient, post, callback);
        else
            update(esClient, post, callback);
    }
    else{
        fail(500,'Post content updated failed. Error: JSON body is empty or undefined', callback);
    }
};

function update(esClient, post, callback){
    const params = {
        index: 'posts',
        type: 'post',
        id: post.postId,
        body: {doc: post}
    };

    esClient.update(params, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            return fail(500, 'Update Post Content failed. Error: ' + error, callback)
        } else {
            console.log('data: ' + JSON.stringify(data));
            return response(200, data, callback)
        }
    });
}

function updateHistory(esClient, post, old, callback) {
    // pack up old values to add to history
    let edit = {};
    edit.title = old.title;
    edit.content = old.content;
    edit.tags = old.tags;
    edit.timestamp = moment().toISOString();
    if(old.history)
        post.history = old.history;
    else
        post.history = [];
    post.history.unshift(edit);
    return update(esClient, post, callback);
}

function getOriginal(esClient, post, callback){
    const params = {
        index: 'posts',
        type: 'post',
        id: post.postId
    };

    esClient.get(params, function(error, data) {
        if(error) {
            console.log('error getting original post: ' + JSON.stringify(error));
            return fail(500, 'Update Post Content failed getting original. Error: ' + error, callback)
        }
        else{
            console.log('original: ' + JSON.stringify(data._source));
            return updateHistory(esClient, post, data._source, callback)
        }
    });
}