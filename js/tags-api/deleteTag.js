'use strict';
const fail = require('./responses').TagsFail;
const success = require('./responses').deleteTagSuccess;

module.exports.deleteTag = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.tag !== undefined &&
            event.pathParameters.tag !== null &&
            event.pathParameters.tag !== "") {

            var tag = event.pathParameters.tag;
            var params = {
                index: 'tags',
                type: 'tag',
                id: tag
            };

            esClient.delete(params, function(err, data) {
                if(err)
                    return fail(500, 'Delete Tag failed. Error: ' + err, callback);
                else
                    return success(callback);
            });
        }
        else
            return fail(400, 'Delete Tag failed.', callback);
    }
    else
        return fail(400, 'Delete Tag failed.', callback);
};