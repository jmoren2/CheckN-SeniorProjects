'user strict';
const success = require('./responses').userReportSuccess;
const fail = require('./responses').userReportSuccess;
const getAllDepartments = require('../departments-api/getAllDepartments.js').getAllDepartments;
const getPostsBySearch = require('../posts-api/getPostsBySearch.js').getPostsBySearch;
const getCommentsBySearch = require('../comments-api/getCommentsBySearch').getCommentsBySearch;
const countVotes = require('./getUserReport.js').countVotes;

module.exports.getGeneralReport = (esClient, event, context, callback) => {

        getPostsBySearch(esClient, event, context, function(err, data){
            if(err){
                var failMessage = {message: 'Failed to create Report. Error: ' + error};
                return fail(500, failMessage, callback);
            }
            else{
                var listOfPostsReturned = JSON.parse(data.body);

                var report = {postCount: listOfPostsReturned.total};

                getCommentsBySearch(esClient, event, context, function(err, data2){
                    if(err){
                        var failMessage = {message: 'Failed to create Report. Error: ' + error};
                        return fail(500, failMessage, callback);
                    }
                    else{
                        var listOfCommentsReturned = JSON.parse(data2.body);

                        report.commentCount = listOfCommentsReturned.count;
                        report.positiveCount = countVotes(listOfCommentsReturned.comments, "positive");
                        report.negativeCount = countVotes(listOfCommentsReturned.comments, "negative");
                        report.neutralCount = countVotes(listOfCommentsReturned.comments, "neutral");
                    getAllDepartments(esClient, event, context, function(err, data3){
                        if(err){
                            var failMessage = {message: 'Failed to create Report. Error: ' + error};
                            return fail(500, failMessage, callback);
                        }
                        else{
                            var listOfDepartments = JSON.parse(data3.body);
                            report.departmentCount = listOfDepartments.count;
                            if(report.departmentCount > 0){
                                report.avgPostPerDepartment = report.postCount / report.departmentCount
                            }
                            return success(200, report, callback);

                        }
                    });
                }
                });
            }
        });
        
};

