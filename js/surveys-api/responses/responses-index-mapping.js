'use strict';

var mapping = require('./responses-index-mapping.json');

module.exports.mapIndex = async (esClient, event, context, callback) => {
    console.log('mapping: ' + JSON.stringify(mapping));
    var options = {
        index: 'responses',
        type: 'response',
        body: mapping
    };
    var data;

    try {
        await esClient.indices.delete({index: 'responses'});
        await esClient.indices.create({index: 'responses'});
        data = await esClient.indices.putMapping(options);
        console.log(data);
        return success(data, callback);
    } catch (error) {
        console.log(error);
        return fail(500, error, callback);
    }

    
};

function fail(code, msg, callback) {
    return callback(null, {
        statusCode: code,
        body: {
            error: msg
        }
    });
}

function success(response, callback) {
    return callback(null, {
        statusCode: 200,
        body: {
            data: response
        }
    });
}