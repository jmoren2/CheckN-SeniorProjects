'use strict';
var getDepartmentFail = function(code, msg, callback) {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

var getSingleDepartmentSuccess = function(code, department, callback) {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            department: department
        })
    })
}

module.exports.getDepartmentReport = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.departmentId !== undefined && 
            event.pathParameters.departmentId !== null && 
            event.pathParameters.departmentId !== "") {
            console.log("Received proxy: " + event.pathParameters.departmentId);

            if(!context.page) context.page = 1;
            if(!context.pageSize) context.pageSize = 10

            const PAGE_SIZE = 10000;
            var department = decodeURIComponent(event.pathParameters.departmentId);
            var params = {};
            var report = {};

            // Retrieve # of Users
            var userCount = function(report, callback){
                params = {
                    index: 'users',
                    type:'user',
                    body: { query: { nested :{
                        path: "userPermissions",
                        query: { bool: { must: { match:{
                            "userPermissions.department": department
                        }}}}
                    }}},
                    size: PAGE_SIZE
                }
                esClient.search(params, function(err, data){
                    if(err) {
                        report.totalUser = 0;
                        console.log("Get Department Report: get user count failed");
                    }
                    else{
                        var user;
                        var users;
                        var totalUser;
                        var contributors  = [];
                        var MAX = 10;

                        if(data.hits === null || data.hits === undefined || 
                            data.hits.hits === undefined || data.hits.hits === null){
                            report.totalUser = 0;
                        }
                        else{
                            users = data.hits.hits;
                            totalUser = data.hits.hits.length;
                            report.totalUser = totalUser; 

                            for (var i = 0; i < totalUser; i++){
                                user = users[i]._source;
                                contributors.push(user);
                            }

                            contributors.sort(function(a,b) {
                                if(a.posts === undefined && a.posts === null && 
                                    b.posts === undefined && b.posts === null)
                                    return 0;
                                else if(a.posts !== undefined && a.posts !== null &&
                                        b.posts !== null && b.posts !== undefined){
                                            if(a.posts.length > b.posts.length)
                                                return -1;
                                            else if(a.posts.length < b.posts.length)
                                                return 1;
                                            return 0;
                                        }
                                else if(a.posts !== undefined && a.posts !== null &&
                                        b.posts === null && b.posts === undefined)
                                            return -1;
                                else
                                    return 1;
                            })

                            for(var i = 0; i < contributors.length; i++) {
                                if(contributors[i].posts !== undefined && contributors[i].posts !== null)
                                    contributors[i].totalPosts = contributors[i].posts.length;
                                else
                                    contributors[i].totalPosts = 0;
                            }
                            if(contributors.length < MAX){
                                report.topTencontributors = contributors;
                            }
                            else
                                report.topTencontributors = contributors.slice(0,MAX);
                        }
                    }
                    return getSingleDepartmentSuccess(200, report,callback);
                })
            }

        
            // Retrieve # of Posts, # of Survey, # of Comments
            params = {
                index: 'posts',
                type:'post',
                body: { query: { nested :{
                    path: "visibilityLevel",
                    query: { bool: { must: { match:{
                        "visibilityLevel.department": department
                    }}}}
                }}},
                size: PAGE_SIZE
            }

            esClient.search(params, function(err, data) {
                if(err)
                    return getDepartmentFail(500,'get report by department failed. Error: ' + err, callback);
                else {
                    if(data.hits === null || data.hits === undefined || data.hits.total === 0){
                        report.totalPost = 0;
                        report.totalComment = 0;
                        report.totalSurvey = 0;
                    }
                    else{
                        var totalPost = 0;
                        var totalSurvey = 0;
                        var totalComment = 0;
                        var post;
                        for(var i = 0; i < data.hits.hits.length; i++) { 
                            post = data.hits.hits[i]._source;
                            if(post.surveyId !== undefined && post.surveyId !== null && post.surveyId !== "" ){
                                totalSurvey += 1;
                            }
                            else {
                                totalPost += 1;
                            }
                            if(post.comments !== undefined && post.comments !== null)
                                totalComment += post.comments.length
                        }
                        report.totalPost = totalPost;
                        report.totalComment = totalComment;
                        report.totalSurvey = totalSurvey;
                    }
                    return userCount(report,callback);
                    //return getSingleDepartmentSuccess(200,data,callback);
                }
            });
        }
        else
            return getDepartmentFail(400, 'get Report by department failed.', callback);
    }
    else
        return getDepartmentFail(400,'get Report by department failed', callback);
};