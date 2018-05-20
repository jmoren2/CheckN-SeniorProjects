'use strict';

var mapping = require('./roles-index-mapping.json');

module.exports.mapIndex = async (esClient, event, context, callback) => {
    console.log('mapping: ' + JSON.stringify(mapping));
    var options = {
        index: 'roles',
        type: 'role',
        body: mapping
    };
    var data;

    try {
        await esClient.indices.delete({index: 'roles'});
        await esClient.indices.create({index: 'roles'});
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

function success(role, callback) {
    return callback(null, {
        statusCode: 200,
        body: {
            data: role
        }
    });
}