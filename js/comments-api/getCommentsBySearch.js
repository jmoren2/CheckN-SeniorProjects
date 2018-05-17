'use strict';
const success = require('./responses').multiCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentsBySearch = (esClient, event, context, callback) => {
    var search, user;

    // pull search key(s) and user from the query string
    if(event.queryStringParameters) {
        search = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        console.log("Search string: " + search);
        console.log("User string: " + user);
    }

    var filter = {};
    filter.query.bool = {
        must: [],
        should: []
    };
    if(search !== undefined) {
        filter.query.bool.must += [
            {
                match: {
                    content: search
                }
            }
        ]
    }
    if(user !== undefined) {
        filter.query.bool.must += [{
            match: {
                userId: user
            }
        }];
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