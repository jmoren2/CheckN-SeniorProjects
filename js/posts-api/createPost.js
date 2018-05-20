'use strict';

const uuid = require('uuid');
const moment = require('moment');
const success = require('./responses.js').singlePostSuccess;
const fail = require('./responses.js').postsFail;
const createSurvey = require('../survey-api/survey/createSurvey.js').createSurvey;

module.exports.createPost = (esClient, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    body.postId = uuid.v4();
    var now = moment().toISOString();
    body.timestamp = now;

    var post = {
        Item: body,
        TableName: 'posts'

    }

    var params = {
      index: 'posts',
      type: 'post',
      id: body.postId,
      body: body
    };

    esClient.create(params, function(error, data) {
      if(error) {
        console.log('error: ' + JSON.stringify(error));
        return fail(500, 'Post creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + JSON.stringify(data));
        if(post.Item.hasOwnProperty('survey') && !isEmptyObject(post.Item.survey)){
          event.body = JSON.stringify(post.Item.survey);
          createSurvey(ddb, event, context, function(err, data2){
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
