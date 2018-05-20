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

    var params = {
      index: 'posts',
      type: 'post',
      id: post.postId,
      body: post
    };

    esClient.create(params, function(error, data) {
      if(error) {
        console.log('error: ' + JSON.stringify(error));
        return fail(500, 'Post creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + JSON.stringify(data));
        if(post.hasOwnProperty('survey') && !isEmptyObject(post.survey)){
          event.body = JSON.stringify(post.survey);
          createSurvey(esClient, event, context, function(err, data2){
            if(err) {
              var failMessage = {message: 'Failed to create Survey. Error: ' + error};
              fail(500, failMessage, callback);
            }
            else {

              success(200, body, callback);
            }
          });
        }
        else
          return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Post creation failed.', callback)
  }
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
