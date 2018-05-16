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
    var userFilter, tagFilter, searchFilter;

    if(search !== undefined) {
        console.log('search: ' + search);
        searchFilter = {
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
        };
    }
    if(user !== undefined) {
        userFilter = { match: { userId: user } };
    }

    if(tag !== undefined) {
        tagFilter = { match: { tags: tag } };
    }
    filter.query.bool.should.push(searchFilter);
    var mustFilter = {bool: {must:[]}}
    mustFilter.bool.must.push(userFilter);
    mustFilter.bool.must.push(tagFilter);
    filter.query.bool.should.push(mustFilter);
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