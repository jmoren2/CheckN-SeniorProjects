'use strict';
const AWS = require('aws-sdk');
//const ddb = new AWS.DynamoDB.DocumentClient();
const es = require('elasticsearch');
AWS.Config.region = 'us-west-2';
const esClient = es.Client({
  hosts: 'https://search-checkn-dev-2kiktd5jmzuvcarxmggu6tb4ju.us-west-2.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    credentials: new AWS.EnvironmentCredentials('AWS')
  }
});

/*module.exports.getCommentsByPostId = (event, context, callback) => {
  const getCommentsByPostId = require('./getCommentsByPostId').getCommentsByPostId;
  getCommentsByPostId(esClient, event, context, callback);
};*/

module.exports.getCommentById = (event, context, callback) => {
  const getCommentById = require('./getCommentById').getCommentById;
  getCommentById(esClient, event, context, callback);
};

module.exports.getCommentsBySearch = (event, context, callback) => {
  const getCommentsBySearch = require('./getCommentsBySearch').getCommentsBySearch;
  getCommentsBySearch(esClient, event, context, callback);
};

module.exports.createComment = (event, context, callback) => {
  const createComment = require('./createComment').createComment;
  createComment(esClient, event, context, callback);
};

module.exports.updateComment = (event, context, callback) => {
  const updateComment = require('./updateComment').updateComment;
  updateComment(esClient, event, context, callback);
};

module.exports.deleteComment = (event, context, callback) => {
  const deleteComment = require('./deleteComment').deleteComment;
  deleteComment(esClient, event, context, callback);
};

/*module.exports.mapIndexComments = (event, context, callback) => {
  const mapIndexComments = require('./comments-index-mapping').mapIndexComments;
  mapIndexComments(esClient, event, context, callback);
};*/