'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const es = require('elasticsearch');
AWS.Config.region = 'us-west-2';
const esClient = es.Client({
  hosts: 'https://search-checkn-dev-2kiktd5jmzuvcarxmggu6tb4ju.us-west-2.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    credentials: new AWS.EnvironmentCredentials('AWS')
  }
});

module.exports.getPostById = (event, context, callback) => {
  const getPostById = require('./getPostById').getPostById;
  getPostById(esClient, event, context, callback);
};

module.exports.getPostsBySearch = (event, context, callback) => {
  const getPostsBySearch = require('./getPostsBySearch').getPostsBySearch;
  getPostsBySearch(esClient, event, context, callback);
};

module.exports.createPost = (event, context, callback) => {
  const createPost = require('./createPost').createPost;
  createPost(esClient, event, context, callback);
};

module.exports.deletePost = (event, context, callback) => {
  const deletePost = require('./deletePost').deletePost;
  deletePost(ddb, event, context, callback);
}

module.exports.updatePost = (event, context, callback) => {
  const updatePost = require('./updatePost').updatePost;
  updatePost(ddb, event, context, callback);
}

module.exports.mapIndex = (event, context, callback) => {
  const mapIndex = require('./posts-index-mapping').mapIndex;
  mapIndex(esClient, event, context, callback);
}