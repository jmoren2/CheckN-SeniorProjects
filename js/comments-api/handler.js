'use strict';
const AWS = require('aws-sdk');
const getCommentsByPostId = require('./getCommentsByPostId').getCommentsByPostId
const getCommentsBySearch = require('./getCommentsBySearch').getCommentsBySearch
const createComment = require('./createComment').createComment;
const deleteComment = require('./deleteComment').deleteComment;
const updateComment = require('./updateComment').updateComment;
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

module.exports.getDog = (event, context, callback) => {
  getDog(ddb, event, callback);
}

module.exports.getDogs = (event, context, callback) => {
  getDogs(ddb, event, callback);
}

module.exports.createDog = (event, context, callback) => {
  createDog(ddb, event, callback);
}
