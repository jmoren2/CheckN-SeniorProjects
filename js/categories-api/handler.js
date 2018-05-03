'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getCategoriesByPostId = (event, context, callback) => {
  const getCategoriesByPostId = require('./getCategoriesByPostId').getCategoriesByPostId
  getCategoriesByPostId(ddb, event, context, callback);
};

module.exports.getAllCategories = (event, context, callback) => {
  const getAllCategories = require('./getAllCategories').getAllCategories;
  getAllCategories(ddb, event, context, callback);
};

module.exports.createCategory = (event, context, callback) => {
  const createCategory = require('./createCategory').createCategory;
  createCategory(ddb, event, context, callback);
}

module.exports.updateCategory = (event, context, callback) => {
  const updateCategory = require('./updateCategory').updateCategory;
  updateCategory(ddb, event, context, callback);
}

module.exports.deleteCategory = (event, context, callback) => {
  const deleteCategory = require('./deleteCategory').deleteCategory;
  deleteCategory(ddb, event, context, callback);
}