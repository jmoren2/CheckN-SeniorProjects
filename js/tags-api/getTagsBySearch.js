'use strict';
const success = require('./responses').multiTagSuccess;
const fail = require('./responses').TagsFail;

module.exports.getTagsBySearch = (esClient, event, context, callback) => {

    // If there are query parameters, something was probably misused
    if(event.queryStringParameters) {
        console.log(event);
        return fail(500, 'getAllTags: Extra parameters', callback)
    }

    var params = {
        index: 'tags',
        type: 'tag',
        body: {}
    };

    var tags = [];

    esClient.search(params, function (err, data) {
        if (err)
            return fail(500, 'getAllTags failed. Error: ' + err, callback);
        else {
            console.log(data);

            var hits = data.hits.hits;

            // parse hits for tags
            for(let i = 0; i < hits.length; ++i){
                tags.push(hits[i])
            }

            return success(200, tags, callback);
        }
    })
};