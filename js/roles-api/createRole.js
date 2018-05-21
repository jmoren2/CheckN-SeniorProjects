'use strict';
const success = require('./responses.js').singleRoleSuccess;
const fail = require('./responses.js').RolesFail;

module.exports.createRole = (esClient, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        var body = JSON.parse(event.body);

        // only take role field
        var insert = body.role;

        var params = {
            index: 'roles',
            type: 'role',
            id: insert,
            body: {'role' : insert}
        };

        esClient.create(params, function(error, data) {
            if(error)
                return fail(500, 'createRole failed. Error: ' + error, callback);
            else {
                console.log('data: ' + data);
                return success(200, params.body, callback);
            }
        });
    }
    else
        return fail(500, 'createRole failed. Error: Body empty', callback);
};