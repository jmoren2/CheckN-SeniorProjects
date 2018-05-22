'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getCommentsByPostId = (event, context, callback) => {
  const getCommentsByPostId = require('./getCommentsByPostId').getCommentsByPostId
  getCommentsByPostId(ddb, event, context, callback);
};

module.exports.getCommentsBySearch = (event, context, callback) => {
  const getCommentsBySearch = require('./getCommentsBySearch').getCommentsBySearch
  getCommentsBySearch(ddb, event, context, callback);
};

module.exports.createComment = (event, context, callback) => {
  const createComment = require('./createComment').createComment;
  createComment(ddb, event, context, callback);
}

module.exports.updateComment = (event, context, callback) => {
  const updateComment = require('./updateComment').updateComment;
  updateComment(ddb, event, context, callback);
}

module.exports.deleteComment = (event, context, callback) => {
  const deleteComment = require('./deleteComment').deleteComment;
  deleteComment(ddb, event, context, callback);
}