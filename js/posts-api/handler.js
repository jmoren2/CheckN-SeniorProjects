'use strict';
const AWS = require('aws-sdk');
const getPostById = require('./getPostById').getPostById;
const createPost = require('./createPost').createPost;
const deletePost = require('./deletePost').deletePost;
const updatePost = require('./updatePost').updatePost;
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

module.exports.updatePost = (event, context, callback) => {
  updatePost(ddb, event, context, callback);
}