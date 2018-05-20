'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getTagByName = (event, context, callback) => {
  const getTagByName = require('./getTagByName').getTagByName;
  getTagByName(ddb, event, context, callback);
};

module.exports.getTagsBySearch = (event, context, callback) => {
  const getTagsBySearch = require('./getTagsBySearch').getTagsBySearch;
  getTagsBySearch(ddb, event, context, callback);
};

module.exports.createTag = (event, context, callback) => {
  const createTag = require('./createTag').createTag;
  createTag(ddb, event, context, callback);
};

module.exports.deleteTag = (event, context, callback) => {
  const deleteTag = require('./deleteTag').deleteTag;
  deleteTag(ddb, event, context, callback);
};

module.exports.mapTagsIndex = (event, context, callback) => {
    const mapIndex = require('./tags-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};