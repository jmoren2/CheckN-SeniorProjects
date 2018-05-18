'use strict';
const success = require('./responses').multiCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentsBySearch = (esClient, event, context, callback) => {
    var text, user, post;

    // pull search key(s), user and post from the query string
    if(event.queryStringParameters) {
        text = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        post = event.queryStringParameters.post;
        console.log("Search string: " + text);
        console.log("User string: " + user);
        console.log("Post string: " + post);
    }

    // initialize search query
    var search = {
        query: {
            bool:{
                must: [],
                filter: []
            }
        }
    };

    // match comment content against search text
    if(search !== undefined) {
        search.query.bool.must.push({
            match: {
                content: text
            }
        })
    }
    // match user field
    if(user !== undefined) {
        search.query.bool.filter.push({
            term: {
                userId: user
            }
        })
    }
    // match postId
    if(post !== undefined) {
        search.query.bool.filter.push({
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
            var hits = data.hits.hits;
            var comments = [];

            // parse hits for comment objects
            for(var i = 0; i < hits.length; ++i){
                comments.push(hits[i]._source)
            }
            success(200, comments, callback);
        }
    });
};