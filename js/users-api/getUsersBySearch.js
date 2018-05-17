'use strict';
const success = require('./responses').multiUserSuccess;
const fail = require('./responses').usersFail;

module.exports.getUsersBySearch = (esClient, event, context, callback) => {
    var search;

    // pull search key(s) from the query string
    if(event.queryStringParameters) {
        search = event.queryStringParameters.search;
        console.log("Search string: " + search);
    }

    var filter = {};

    if(search !== undefined) {
        filter.query.bool.must.match.content = search;

        console.log(filter);

        esClient.search({
            index: 'comments',
            type: 'comment',
            body: filter
        }, function (error, data) {
            if (error) {
                console.log('error: ' + JSON.stringify(error));
                fail(400, error, callback);
            } else {
                console.log('data: ' + JSON.stringify(data));
                success(200, data, callback);
            }
        });
    }
    // missing parameters
    else
        return fail(400, 'getUsersBySearch failed. Error: No search parameters specified', callback);
};