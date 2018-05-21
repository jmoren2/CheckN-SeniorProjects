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
    if(text !== undefined) {
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
    console.log(search);

    // associate user names with comments
    var showUsers = function(comments, callback){
        // build search query
        var userIdArr = [];
        for(let i = 0; i < comments.length; ++i){
            if(comments[i].userId) {
                userIdArr.push({
                    match: {
                        userId: comments[i].userId
                    }
                })
            }
        }
        search = {query:{bool:{should:userIdArr}}};
        var userMap = {};

        esClient.search({
            index: 'users',
            type: 'user',
            body: search
        }, function(error, data) {
            if(error) {
                console.log('associating users error: ' + JSON.stringify(error));
            }
            else {
                var userArr = data.hits.hits;
                // populate map
                for(let i = 0; i < userArr.length; ++i){
                    let user = userArr[i]._source;
                    userMap[user.userId] = user.firstName + ' ' + user.lastName;
                }
            }

            // associate user names to comments
            for(let i = 0; i < comments.length; ++i){
                let userName = 'unknown user';
                if(userMap[comments[i].userId]){
                    userName = userMap[comments[i].userId]
                }
                comments[i].userName = userName
            }

            return success(200, comments, callback);
        });
    };

    esClient.search({
        index: 'comments',
        type: 'comment',
        body: search
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            var hits = data.hits.hits;
            var comments = [];

            // parse hits for comment objects
            for(let i = 0; i < hits.length; ++i){
                comments.push(hits[i]._source)
            }
            return showUsers(comments, callback);
        }
    });
};