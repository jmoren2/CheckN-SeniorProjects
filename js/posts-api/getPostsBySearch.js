'use strict';
const success = require('./responses').multiPostSuccess;
const fail = require('./responses').postsFail;

module.exports.getPostsBySearch = (esClient, event, context, callback) => {
    var search, user, tag;

    // pull search key(s) and user from the query string
    if(event.queryStringParameters) {
        search = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        tag = event.queryStringParameters.tag;
        console.log("Search string: " + search);
        console.log("User string: " + user);
        console.log("Tag: " + tag);
    }

    var filter = {
        query: { bool: { should: [] } }
    }

    if(search !== undefined) {
        console.log('search: ' + search);
        filter.query.bool.should.push({
            bool: { should: [
                {
                    match: {
                        title: search
                    }
                },{
                    match : {
                        content: search
                    }
                }
            ] }
        });
    }
    if(user !== undefined) {
        filter.query.bool.should.push({
            bool: { 
                must: [ { match: { userId: user } } ]
            }
        });
    }

    if(tag !== undefined) {
        filter.query.bool.should.push({
            bool: { 
                must: [ { match: { tags: tag } } ]
            }
        });
    }
    console.log(filter);

    esClient.search({
        index: 'posts',
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