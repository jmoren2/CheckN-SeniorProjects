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

    // initialize search query
    var search = {
        query: {
            bool: {
                must: [],
                filter: {}
            }
        }
    };

    // match name field against first OR last name
    if(name !== undefined) {
        search.query.bool.must.push({
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

    // match e-mail field
    if(email !== undefined) {
        search.query.bool.must.push({
            match: {
                email: email
            }
        })
    }

    // initialize permissions filter
    var permFilter = {
        nested: {
            path: "permissions",
            query: {
                bool: {
                    must: []
                }
            }
        }
    };

    // apply department/location/role to permissions filter
    if(dept !== undefined) {
        permFilter.nested.query.bool.must.push({
            term:{
                "permissions.department" : dept
            }
        })
    }
    if(locat !== undefined) {
        permFilter.nested.query.bool.must.push({
            term:{
                "permissions.location" : locat
            }
        })
    }
    if(role !== undefined) {
        permFilter.nested.query.bool.must.push({
            term:{
                "permissions.role" : role
            }
        })
    }
    search.query.bool.filter = permFilter;
    console.log(JSON.stringify(search));

    esClient.search({
        index: 'users',
        type: 'user',
        body: search
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            var hits = data.hits.hits;
            var users = [];

            // parse hits for user objects
            for(var i = 0; i < hits.length; ++i){
                users.push(hits[i]._source)
            }

            success(200, users, callback);
        }
    });
};