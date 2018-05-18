'use strict';
const success = require('./responses').multiUserSuccess;
const fail = require('./responses').usersFail;

module.exports.getUsersBySearch = (esClient, event, context, callback) => {
    var name, email, dept, locat, role;

    // pull search key(s) from the query string
    if(event.queryStringParameters) {
        name = event.queryStringParameters.name;
        email = event.queryStringParameters.email;
        dept = event.queryStringParameters.dept;
        locat = event.queryStringParameters.locat;
        role = event.queryStringParameters.role;
    }

    var filter = {
        query: {
            bool:{
                must: [],
                filter: []
            }
        }
    };

    if(name !== undefined) {
        filter.query.bool.must.push({
            bool: {
                should: [{
                    match: {
                        firstName: name
                    }
                }, {
                    match: {
                        lastName: name
                    }
                }]
            }
        })
    }
    if(email !== undefined) {
        filter.query.bool.must.push({
            match: {
                email: email
            }
        })
    }
    if(dept !== undefined) {
        filter.query.bool.filter.push({
            term: {
                permissions: {
                    department: dept
                }
            }
        })
    }
    if(locat !== undefined) {
        filter.query.bool.filter.push({
            term: {
                permissions: {
                    location: locat
                }
            }
        })
    }
    if(role !== undefined) {
        filter.query.bool.filter.push({
            term: {
                permissions: {
                    role: role
                }
            }
        })
    }
    console.log(filter);

    esClient.search({
        index: 'users',
        type: 'user',
        body: filter
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            success(200, data, callback);
        }
    });
};