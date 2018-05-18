'use strict';
const success = require('./responses').multiCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentsBySearch = (esClient, event, context, callback) => {
    var search, user, post;

    // pull search key(s) and user from the query string
    if(event.queryStringParameters) {
        search = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        post = event.queryStringParameters.post;
        console.log("Search string: " + search);
        console.log("User string: " + user);
        console.log("Post string: " + post);
    }

    var filter = {
        query: {
            bool:{
                must: [],
                filter: []
            }
        }
    };

    if(search !== undefined) {
        filter.query.bool.must.push({
            match: {
                content: search
            }
        })
    }
    if(user !== undefined) {
        filter.query.bool.filter.push({
            term: {
                userId: user
            }
        })
    }
    if(post !== undefined) {
        filter.query.bool.filter.push({
            term: {
                postId: post
            }
        })
    }
    console.log(filter);

    esClient.search({
        index: 'comments',
        type: 'comment',
        body: filter
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            success(200, data, callback);
        }
    });
};