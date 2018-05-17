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
        query: { bool: { must: [] } }
    }
    var userFilter, tagFilter, searchFilter;

    if(search !== undefined) {
        console.log('search: ' + search);
        searchFilter = {
            bool: { 
                should: [
                    {
                        match: {
                            title: search
                        }
                    },{
                        match : {
                            content: search
                        }
                    }
                ],
                minimum_should_match: 1
            }
        };
        filter.query.bool.must.push(searchFilter);
    }
    var mustFilter = {bool: {must:[]}}
    if(user !== undefined) {
        userFilter = { match: { userId: user } };
        mustFilter.bool.must.push(userFilter);
    }

    if(tag !== undefined) {
        tagFilter = { match: { tags: tag } };
        mustFilter.bool.must.push(tagFilter);
    }
    if(mustFilter.bool.must.length > 0) {
        filter.query.bool.must.push(mustFilter);
    }
    console.log(JSON.stringify(filter));

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