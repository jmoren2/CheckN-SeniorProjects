'use strict';
const success = require('./responses.js').singleTagSuccess;
const fail = require('./responses.js').TagsFail;

module.exports.createTag = (esClient, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        var body = JSON.parse(event.body);

        // only take tag field
        var insert = body.tag;

        var params = {
            index: 'tags',
            type: 'tag',
            body: {'tag' : insert}
        };

        esClient.put(params, function(error, data) {
            if(error)
                return fail(500, 'createTag failed. Error: ' + error, callback);
            else {
                console.log('data: ' + data);
                return success(200, params.body, callback);
            }
        });
    }
    else
        return fail(500, 'createTag failed. Error: Body empty', callback);
};