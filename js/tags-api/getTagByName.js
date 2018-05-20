'use strict';
const success = require('./responses').singleTagSuccess;
const fail = require('./responses').TagsFail;

module.exports.getTagByName = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.tag !== undefined &&
            event.pathParameters.tag !== null &&
            event.pathParameters.tag !== "") {
            console.log("Received proxy: " + event.pathParameters.tag);

            var tag = decodeURIComponent(event.pathParameters.tag);
            var params = {
                index: 'tags',
                type: 'tag',
                id: tag
            };

            esClient.get(params, function(err, data) {
                if(err)
                    return fail(500,'get Tag by tag failed. Error: ' + err, callback);
                else {
                    if(data._source == null)
                        return fail(404,'No Tag Found',callback);
                    else
                        return success(200, data._source, callback);
                }
            });
        }
        else
            return fail(400, 'get Tag by tag failed.', callback);
    }
    else
        return fail(400,'get Tag by tag failed', callback);
};