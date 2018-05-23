'use strict';
const getSingleSurveySuccess = require('../responses').singleSurveySuccess;
const getSurveyFail = require('../responses').SurveyFail;

module.exports.getSurveyById = (esClient, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.surveyId !== undefined && 
            event.pathParameters.surveyId !== null && 
            event.pathParameters.surveyId !== "") {
            console.log("Received proxy: " + event.pathParameters.surveyId);

            var id = event.pathParameters.surveyId;
            var params = {
                index: 'surveys',
                type: 'survey',
                id: id
            };


            var showUser = function(survey, callback) {
                var userIds = [];
                for(var i = 0; i < survey.responses.length; i++)
                    userIds[i] = survey.responses[i].userId;
                if(userIds.length === 0 || userIds === undefined || userIds === null)
                    return getSingleSurveySuccess(200, survey, callback);

                params = {
                    index: 'users',
                    type: 'user',
                    body:{
                        ids : userIds
                    }
                };

                esClient.mget(params, function (err, data) {
                    if (err) {
                        console.log('getSurveyId get user error: ' + err);
                        for(var i = 0; i < survey.responses.length; i++){
                            survey.responses[i].userName = "Unknown User";
                        }
                    } else {
                        var user;
                        for(var i = 0; i < data.docs.length; i++) {
                            if(data.docs[i].found === true) {
                                user = data.docs[i]._source;
                                survey.responses[i].userName = user.firstName + ' ' + user.lastName;
                            }
                            else
                                survey.responses[i].userName = "Unknown User"
                        }
                    }
                    return getSingleSurveySuccess(200, survey, callback);
                });
            };


            var showAllResponses = function(survey, callback){
                if(survey.responses === null || survey.responses === undefined ||
                   survey.responses === "")
                   return getSingleSurveySuccess(200, survey, callback);

                params = {
                    index: 'responses',
                    type: 'response',
                    body: {
                        ids: survey.responses
                    }
                };

                esClient.mget(params,function(err,data) {
                    if(err) {
                        console.log("getSurveyById: get all responses failed" + err);
                        survey.responses = "No Responses"
                    }
                    else{
                        for(var i = 0; i < survey.responses.length; i++) {
                            if(data.docs[i].found === true) {
                                delete survey.responses[i];
                                survey.responses[i] = data.docs[i]._source;
                            }
                        }
                        if(survey.responses[0].userId !== undefined && survey.responses[0].userId !== null)
                            return showUser(survey, callback);
                    }
                    return getSingleSurveySuccess(200, survey, callback);
                    
                    //return getSingleSurveySuccess(200, survey, callback);
                });
            }

            esClient.get(params, function(err, data) {
                if(err)
                    return getSurveyFail(500,'get Survey by Id failed. Error: ' + err, callback);
                else {
                    if(data._source === null || data._source === undefined)
                      return getSurveyFail(404, 'No Survey Found', callback);
                    else
                      return showAllResponses(data._source, callback);
                }
            });
        }
        else
            return getSurveyFail(400, 'get Survey by Id failed.', callback);
    }
    else
        return getSurveyFail(400,'get Survey by Id failed', callback);
};