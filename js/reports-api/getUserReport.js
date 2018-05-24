'user strict';
const success = require('./responses').userReportSuccess;
const fail = require('./responses').userReportSuccess;
const getPostsBySearch = require('../posts-api/getPostsBySearch.js').getPostsBySearch;

module.exports.getUserReport = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {

        var userId = event.pathParameters.userId;
        console.log(userId);
        event.queryStringParameters = {user: userId};
        getPostsBySearch(esClient, event, context, function(err, data){
            if(err){
                var failMessage = {message: 'Failed to create Report. Error: ' + error};
                return fail(500, failMessage, callback);
            }
            else{
                 var listOfPostsReturned = JSON.parse(data.body);
                 var report = {postCount: listOfPostsReturned.count}
                 return success(200, report, callback);
            }
        });
    }

};