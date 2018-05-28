'user strict';
const success = require('./responses').userReportSuccess;
const fail = require('./responses').userReportSuccess;
const getPostsBySearch = require('../posts-api/getPostsBySearch.js').getPostsBySearch;
const getCommentsBySearch = require('../comments-api/getCommentsBySearch.js').getCommentsBySearch;
const getSurveysBySearch = require('../surveys-api/surveys/getSurveysBySearch.js').getSurveysBySearch;
module.exports.countVotes = function countVotes(obj, typeOfComment){
    var count = 0;
    for(i=0; i < obj.length; i++){
        if(obj[i].vote.toLowerCase()===typeOfComment)
            count +=1;
    }
    return count;
}

const countVotes = require('./getUserReport.js').countVotes;

module.exports.getUserReport = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {

        var userId = event.pathParameters.userId;
        console.log(userId);
        event.queryStringParameters = {user: userId};
        event.queryStringParameters.pageSize = 100;
        getPostsBySearch(esClient, event, context, function(err, data){
            if(err){
                var failMessage = {message: 'Failed to create Report. Error: ' + error};
                return fail(500, failMessage, callback);
            }
            else{
                 var listOfPostsReturned = JSON.parse(data.body);
                 var report = {postCount: listOfPostsReturned.total}
                 getCommentsBySearch(esClient, event, context, function(err, data2){
                    if(err){
                        var failMessage = {message: 'Failed to create Report. Error: ' + error};
                        return fail(500, failMessage, callback)
                    }
                    else{
                        var listOfCommentsReturned = JSON.parse(data2.body);
                        report.commentCount = listOfCommentsReturned.count;
                        
                        report.positiveVotes = countVotes(listOfCommentsReturned.comments, "positive");
                        report.neutralVotes = countVotes(listOfCommentsReturned.comments, "neutral");
                        report.negativeVotes = countVotes(listOfCommentsReturned.comments, "negative");
                        getSurveysBySearch(esClient, event, context, function(err, data3){
                            if(err){
                                var failMessage = {message: 'Failed to create Report. Error: ' + error};
                                return fail(500, failMessage, callback)
                            }  
                            else{
                                var listOfSurveysReturned = JSON.parse(data3.body);
                                report.surveyCount = listOfSurveysReturned.total;
                                return success(200, report, callback);
                            }
                        });
                    }
                 });
            }
        });
    }

};

