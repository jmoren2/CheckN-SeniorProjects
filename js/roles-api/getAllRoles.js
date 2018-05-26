'use strict';
const success = require('./responses').multiRoleSuccess;
const fail = require('./responses').RolesFail;

module.exports.getAllRoles = (esClient, event, context, callback) => {

    // If there are query parameters, something was probably misused
    if(event.queryStringParameters) {
        console.log(event);
        return fail(500, 'getAllRoles: Extra parameters', callback)
    }

    var params = {
        index: 'roles',
        type: 'role',
        body: {}
    };

    var roles = [];

    esClient.search(params, function (err, data) {
        if (err)
            return fail(500, 'getAllRoles failed. Error: ' + err, callback);
        else {
            console.log(data);

            var hits = data.hits.hits;

            // parse hits for roles
            for(let i = 0; i < hits.length; ++i){
                roles.push(hits[i]._source.role)
            }

            return success(200, roles, callback);
        }
    })
};