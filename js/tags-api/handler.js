'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getTagById = (event, context, callback) => {
  const getTagById = require('./getTagById').getTagById;
  getTagById(ddb, event, context, callback);
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
}

module.exports.updateTag = (event, context, callback) => {
  const updateTag = require('./updateTag').updateTag;
  updateTag(ddb, event, context, callback);
}