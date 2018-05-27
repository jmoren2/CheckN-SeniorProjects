'use strict';
const success = require('../responses').multiSurveysSuccess;
const fail = require('../responses').SurveyFail;

module.exports.getSurveysBySearch = (esClient, event, context, callback) => {
    var text, user, survey, dept, role;

    // pull search key(s), user and survey from the query string
    if(event.queryStringParameters) {
        text = event.queryStringParameters.search;
        user = event.queryStringParameters.user;
        survey = event.queryStringParameters.surveyId;
        dept = event.queryStringParameters.dept;
        role = event.queryStringParameters.role;
        context.page = event.queryStringParameters.page;
        context.pageSize = event.queryStringParameters.pageSize;
        console.log("Search string: " + text);
        console.log("User string: " + user);
        console.log("survey string: " + survey);
    }

    if(!context.page) context.page = 1;
    if(!context.pageSize) context.pageSize = 10;

    // initialize search query
    var search = {
        query: {
            bool:{
                must: [],
                filter: []
            }
        }
    };

    // match survey content against search text
    if(text !== undefined) {
        search.query.bool.must.push({
            match: {
                content: text
            }
        })
    }

    // match user field
    if(user !== undefined) {
        search.query.bool.must.push({
            match: {
                userId: user
            }
        })
    }
    console.log("Search Query: " + JSON.stringify(search) )

    // match surveyId
    if(survey !== undefined) {
        search.query.bool.filter.push({
            term: {
                surveyId: survey
            }
        })
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
    if(permFilter.nested.query.bool.must.length > 0)
        search.query.bool.filter.push(permFilter);

    console.log(search);

    // associate user names with surveys
    var showUsers = function(surveys, context, callback){
        if(surveys == undefined && surveys.length == 0)
            return success(200, surveys, callback);

        // build search query
        var userIdArr = [];
        for(let i = 0; i < surveys.length; ++i){
            if(surveys[i].userId) {
                userIdArr.push({
                    match: {
                        userId: surveys[i].userId
                    }
                })
            }
        }
        search = {query:{bool:{should:userIdArr}}};
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

            // associate user names to surveys
            for(let i = 0; i < surveys.length; ++i){
                let userName = 'unknown user';
                if(userMap[surveys[i].userId]){
                    userName = userMap[surveys[i].userId]
                }
                surveys[i].userName = userName
            }

            return success(200, surveys, context, callback);
        });
    };

    esClient.search({
        index: 'surveys',
        type: 'survey',
        body: search,
        from: (context.page-1)*context.pageSize,
        size: context.pageSize,
    }, function(error, data) {
        if(error) {
            console.log('error: ' + JSON.stringify(error));
            fail(400, error, callback);
        } else {
            console.log('data: ' + JSON.stringify(data));
            var hits = data.hits.hits;
            var surveys = [];

            context.totalPosts = data.hits.total;

            // parse hits for survey objects
            for(let i = 0; i < hits.length; ++i){
                surveys.push(hits[i]._source)
            }

            return showUsers(surveys, context,callback);
        }
    });
};