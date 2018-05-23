'use strict';

const uuid = require('uuid');
const moment = require('moment');
const success = require('./responses.js').singlePostSuccess;
const fail = require('./responses.js').postsFail;
const createSurvey = require('../surveys-api/surveys/createSurvey.js').createSurvey;

module.exports.createPost = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var post = JSON.parse(event.body);
    post.postId = uuid.v4();
    post.timestamp = moment().toISOString();

    if(post.hasOwnProperty('survey') && !isEmptyObject(post.survey)){
      post.survey.postId = post.postId;
      event.body = JSON.stringify(post.survey);
      createSurvey(esClient, event, context, function(err, data2){
        if(err) {
          var failMessage = {message: 'Failed to create Survey. Error: ' + error};
          fail(500, failMessage, callback);
        } else {
          var newSurvey = JSON.parse(data2.body);
          post.surveyId = newSurvey.survey.surveyId;
          delete post.survey;

          var params = {
            index: 'posts',
            type: 'post',
            id: post.postId,
            body: post
          };

          console.log('post: ' + JSON.stringify(post));
          console.log('survey: ' + JSON.stringify(newSurvey.survey));
      
          esClient.create(params, function(error, data) {
            if(error) {
              return fail(500, 'Post creation failed. Error: ' + error, callback);
            } else {
              console.log('data: ' + JSON.stringify(data));
              return success(200, post, callback);
            }
          });
        }
      });
    }
  } else {
    return fail(500, 'Post creation failed.', callback)
  }
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
