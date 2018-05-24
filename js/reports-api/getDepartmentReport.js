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

            var department = decodeURIComponent(event.pathParameters.departmentId);
            var report = {};
            var params = {
                index: 'posts',
                //q:"department:" + department
            };
            
            var userCount = function(report, callback){
                params={
                    index:'users',
                    //q:"department:" + department
                }
                esClient.search(params, function(err, data){
                    if(err) {
                        report.userCount = 0;
                        console.log("Get Department Report: get user count failed");
                    }
                    else{
                        var users;
                        var userCount;
                        if(data.hits === null || data.hits === undefined || data.hits.total === 0){
                            report.userCount = 0;
                        }
                        else{
                            userCount = data.hits.hits.length;
                            users = data.hits.hits;
                            var topTenContributer = [];

                            if(userCount < 10)
                                topTenContributer = users;
                            else{
                                for (var i = 0; i < 10; i++){
                                    topTenContributer.push(users[userCount-i-1]);
                                }
                                report.topTenContributer = topTenContributer;
                            }
                            report.userCount = userCount;
                        }
                    }
                    return getSingleDepartmentSuccess(200,users,callback);
                })
            }
    
            esClient.search(params, function(err, data) {
                if(err)
                    return getDepartmentFail(500,'get report by department failed. Error: ' + err, callback);
                else {
                    if(data.hits === null || data.hits === undefined || data.hits.total === 0){
                        report.postCount = 0;
                    }
                    else{
                        var postCount = 0;
                        var surveyCount = 0;
                        var post;
                        for(var i = 0; i < data.hits.hits.length; i++) { 
                            post = data.hits.hits[i]._source;
                            if(post.surveyId !== undefined && post.surveyId !== null && post.surveyId !== "" ){
                                surveyCount += 1;
                            }
                            else
                                postCount += 1;
                        }
                        report.postCount = postCount;
                        report.surveyCount = surveyCount;
                    }
                    return userCount(report,callback);
                    //return getSingleDepartmentSuccess(200, report, callback);
                    //return getSingleDepartmentSuccess(200, post, callback);
                }
            });
        }
        else
            return getDepartmentFail(400, 'get Report by department failed.', callback);
    }
    else
        return getDepartmentFail(400,'get Report by department failed', callback);
};