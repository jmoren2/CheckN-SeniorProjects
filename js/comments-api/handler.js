'use strict';
const AWS = require('aws-sdk');
const getCommentsByPostId = require('./getCommentsByPostId').getCommentsByPostId
const getCommentsBySearch = require('./getCommentsBySearch').getCommentsBySearch
const createComment = require('./createComment').createComment;
const deleteComment = require('./deleteComment').deleteComment;
const updateComment = require('./updateComment').updateComment;
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getCommentsByPostId = (event, context, callback) => {
  getCommentsByPostId(ddb, event, context, callback);
};

module.exports.getCommentsBySearch = (event, context, callback) => {
  getCommentsBySearch(ddb, event, context, callback);
};

module.exports.createComment = (event, context, callback) => {
  createComment(ddb, event, context, callback);
}

module.exports.updateComment = (event, context, callback) => {
  updateComment(ddb, event, context, callback);
}

module.exports.deleteComment = (event, context, callback) => {
  deleteComment(ddb, event, context, callback);
}