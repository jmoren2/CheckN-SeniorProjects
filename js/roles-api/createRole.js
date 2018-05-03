'use strict';
const success = require('./responses.js').singleRoleSuccess;
const fail = require('./responses.js').RolesFail;

module.exports.createRole = (ddb, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        var body = JSON.parse(event.body);

        var role = {
            Item: body,
            TableName: 'roles'
        };

        ddb.put(role, function(error, data) {
            if(error)
                return fail(500, 'createRole failed. Error: ' + error, callback);
            else {
                console.log('data: ' + data);
                return success(200, body, callback);
            }
        });
    }
    else
        return fail(500, 'createRole failed. Error: Body empty', callback);
};