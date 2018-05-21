'use strict';

var mapping = require('./departments-index-mapping.json');

module.exports.mapIndex = async (esClient, event, context, callback) => {
    console.log('mapping: ' + JSON.stringify(mapping));
    var options = {
        index: 'departments',
        type: 'department',
        body: mapping
    };
    var data;

    try {
        // await esClient.indices.delete({index: 'departments'});
        await esClient.indices.create({index: 'departments'});
        data = await esClient.indices.putMapping(options);
    } catch (error) {
        console.log(error);
        return fail(500, error, callback);
    }

    console.log(data);
    return success(data, callback);
};

function fail(code, msg, callback) {
    return callback(null, {
        statusCode: code,
        body: {
            error: msg
        }
    });
}

function success(department, callback) {
    return callback(null, {
        statusCode: 200,
        body: {
            data: department
        }
    });
}