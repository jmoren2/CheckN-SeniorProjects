'user strict';
const success = require('./responses').userReportSuccess;
const fail = require('./responses').userReportSuccess;
const getPostsBySearch = require('../posts-api/getPostsBySearch.js').getPostsBySearch;

module.exports.getUserReport = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {

        var params = {
            "postCount": 0
        }
        event.queryStringParameters.user = event.pathParameters
        getPostsBySearch(esClient, event, context, function(err, data){
            if(err){
                var failMessage = {message: 'Failed to create Report. Error: ' + error};
                return fail(500, failMessage, callback);
            }
            else{
                var listOfPostsReturned = JSON.parse(data.body);
                params.postCount = listOfPostsReturned.count;
                return success(400, params, callback);
            }
        });
    }

};