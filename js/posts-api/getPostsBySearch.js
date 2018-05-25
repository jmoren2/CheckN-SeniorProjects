'use strict';
const success = require('./responses').multiPostSuccess;
const fail = require('./responses').postsFail;

module.exports.getPostsBySearch = (esClient, event, context, callback) => {
    var /*forUser,*/ search, user, tag, dept, role;

    // pull search key(s) and user from the query string
    if(event.queryStringParameters) {
        //forUser = event.queryStringParameters.forUser;
        search = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        tag = event.queryStringParameters.tag;
        dept = event.queryStringParameters.dept;
        role = event.queryStringParameters.role;
        context.page = event.queryStringParameters.page;
        context.pageSize = event.queryStringParameters.pageSize;
        console.log("Search string: " + search);
        console.log("User string: " + user);
        console.log("Tag: " + tag);
    }

    if(!context.page) context.page = 1;
    if(!context.pageSize) context.pageSize = 10;

    var filter = {
        query: { bool: { must: [], filter: {} } }
    };

    var userFilter, tagFilter, searchFilter;

    if(search !== undefined) {
        console.log('search: ' + search);
        searchFilter = {
            bool: { 
                should: [
                    {
                        match: {
                            title: search
                        }
                    },{
                        match : {
                            content: search
                        }
                    }
                ],
                minimum_should_match: 1
            }
        };
        filter.query.bool.must.push(searchFilter);
    }
    var mustFilter = {bool: {must:[]}};
    if(user !== undefined) {
        userFilter = { match: { userId: user } };
        mustFilter.bool.must.push(userFilter);
    }

    if(tag !== undefined) {
        tagFilter = { match: { tags: tag } };
        mustFilter.bool.must.push(tagFilter);
    }

    // initialize visibilityLevel filter
    var permFilter = {
        nested: {
            path: "visibilityLevel",
            query: {
                bool: {
                    must: []
                }
            }
        }
    };

    // apply department/role to permissions filter
    if(dept !== undefined) {
        permFilter.nested.query.bool.must.push({
            term:{
                "visibilityLevel.department" : dept
            }
        })
    }
    if(role !== undefined) {
        permFilter.nested.query.bool.must.push({
            term:{
                "visibilityLevel.role" : role
            }
        })
    }

    if(mustFilter.bool.must.length > 0) {
        filter.query.bool.must.push(mustFilter);
    }
    filter.query.bool.filter = permFilter;
    console.log('post filter: ' + JSON.stringify(filter));

    esClient.search({
        index: 'posts',
        body: filter,
        from: (context.page-1)*context.pageSize,
        size: context.pageSize,
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            var hits = data.hits.hits;
            context.totalPosts = data.hits.total;
            var posts = [];

            // parse hits for post objects
            for(let i = 0; i < hits.length; ++i){
                posts.push(hits[i]._source)
            }

            console.log('posts: ' + JSON.stringify(posts));
            return showUsers(esClient, posts, context, callback);
        }
    });
};

// associate user names with posts
function showUsers(esClient, posts, context, callback){
    // build search query
    var userIdArr = [];
    for(let i = 0; i < posts.length; ++i){
        if(posts[i].userId) {
            userIdArr.push({
                match: {
                    userId: posts[i].userId
                }
            })
        }
    }

    var search = { query: { bool: { should: userIdArr } } };
    console.log('user filter: ' + JSON.stringify(search));
    var userMap = {};

    esClient.search({
        index: 'users',
        type: 'user',
        body: search
    }, function(error, data) {
        if(error) {
            console.log('associating users error: ' + JSON.stringify(error));
        }
        else {
            var userArr = data.hits.hits;
            // populate map
            for(let i = 0; i < userArr.length; ++i){
                let user = userArr[i]._source;
                userMap[user.userId] = user.firstName + ' ' + user.lastName;
            }
        }

        // associate user names to posts
        for(let i = 0; i < posts.length; ++i){
            let userName = 'unknown user';
            if(userMap[posts[i].userId]){
                userName = userMap[posts[i].userId]
            }
            posts[i].userName = userName
        }

        return success(200, posts, context, callback);
    });
};