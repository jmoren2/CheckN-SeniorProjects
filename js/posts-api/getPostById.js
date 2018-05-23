'use strict';
const success = require('./responses').singlePostSuccess;
const fail = require('./responses').postsFail;
const getSurveyById = require('../surveys-api/surveys/getSurveyById').getSurveyById;

module.exports.getPostById = (esClient, event, context, callback) => {
    console.log('parameter content: ' + JSON.stringify(event.pathParameters));

    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.postId !== undefined && 
            event.pathParameters.postId !== null && 
            event.pathParameters.postId !== "") {
            console.log("Received proxy: " + event.pathParameters.postId);

            var id = event.pathParameters.postId;

            var params = {
               index: 'posts',
               type: 'post',
               id: id
            };

            esClient.get(params, function(err, data) {
                if(err) {
                    console.log('error: ' + err);
                    return fail(500,'get post by postId failed. Error: ' + err, callback);
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    var post = data._source;
                    var paramsUser = {
                        index: 'users',
                        type: 'user',
                        id: post.userId
                     };
                    esClient.get(paramsUser, function(err, data2){
                        if(err){
                            console.log('getPostById get user error: ' + err);
                            post.userName = 'unknown user';
                        } else {
                            console.log('data: ' + JSON.stringify(data2));
                            var user = data2._source;
                            post.userName = user.firstName + ' ' + user.lastName;
                            if(post.surveyId) {
                                event.pathParameters.surveyId = post.surveyId;
                                getSurveyById(esClient, event, context, function(err, data3) {
                                    if(err) {
                                        return fail(500, 'unable to retrieve survey: ' + error, callback);
                                    } else {
                                        delete post.surveyId;
                                        post.survey = JSON.parse(data3.body).survey;
                                        console.log('post: ' + JSON.stringify(post));  
                                        console.log('survey: ' + JSON.stringify(data3.body));                                       
                                        return success(200, post, callback);
                                    }
                                })
                            }
                        }
                    });
                }
            });

        }
        else
            return fail(400, 'get post by postId failed.', callback);
    }
    else
        return fail(400,'get post by postId failed', callback);
};
