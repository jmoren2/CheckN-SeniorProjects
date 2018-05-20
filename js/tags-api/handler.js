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

module.exports.getTagByName = (event, context, callback) => {
  const getTagByName = require('./getTagByName').getTagByName;
  getTagByName(esClient, event, context, callback);
};

module.exports.getTagsBySearch = (event, context, callback) => {
  const getTagsBySearch = require('./getTagsBySearch').getTagsBySearch;
  getTagsBySearch(esClient, event, context, callback);
};

module.exports.createTag = (event, context, callback) => {
  const createTag = require('./createTag').createTag;
  createTag(esClient, event, context, callback);
};

module.exports.deleteTag = (event, context, callback) => {
  const deleteTag = require('./deleteTag').deleteTag;
  deleteTag(esClient, event, context, callback);
};

module.exports.mapTagsIndex = (event, context, callback) => {
    const mapIndex = require('./tags-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};