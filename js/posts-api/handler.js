'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getPostById = (event, context, callback) => {
  const getPostById = require('./getPostById').getPostById;
  getPostById(ddb, event, context, callback);
};

module.exports.getPostsBySearch = (event, context, callback) => {
  const getPostsBySearch = require('./getPostsBySearch').getPostsBySearch;
  getPostsBySearch(ddb, event, context, callback);
};

module.exports.createPost = (event, context, callback) => {
  const createPost = require('./createPost').createPost;
  createPost(ddb, event, context, callback);
};

module.exports.deletePost = (event, context, callback) => {
  const deletePost = require('./deletePost').deletePost;
  deletePost(ddb, event, context, callback);
}

module.exports.updatePost = (event, context, callback) => {
  const updatePost = require('./updatePost').updatePost;
  updatePost(ddb, event, context, callback);
}