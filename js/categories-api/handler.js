'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getCategory = (event, context, callback) => {
  const getCategory = require('./getCategoriesById').getCategory
  getCategory(ddb, event, context, callback);
};

module.exports.getCategoriesBySearch = (event, context, callback) => {
  const getCategoriesBySearch = require('./getCategoriesBySearch').getCategoriesBySearch
  getCategoriesBySearch(ddb, event, context, callback);
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