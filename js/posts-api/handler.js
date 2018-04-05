'use strict';
const AWS = require('aws-sdk');
const getPostById = require('./getPostById').getPostById;
const createPost = require('./createPost').createPost;
const deletePost = require('./deletePost').deletePost;
const updatePostContent = require('./updatePostContent').updatePostContent;
const updatePostState = require('./updatePostState').updatePostState;
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getPostById = (event, context, callback) => {
  getPostById(ddb, event, context, callback);
};

module.exports.createPost = (event, context, callback) => {
  createPost(ddb, event, context, callback);
};

module.exports.deletePost = (event, context, callback) => {
  deletePost(ddb, event, context, callback);
}

module.exports.updatePostContent = (event, context, callback) => {
  updatePostContent(ddb, event, context, callback);
}

module.exports.updatePostState = (event, context, callback) => {
  updatePostState(ddb, event, context, callback);
}
