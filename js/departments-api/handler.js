'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getDepartmentsByPostId = (event, context, callback) => {
  const getDepartmentsByPostId = require('./getDepartmentsByPostId').getDepartmentsByPostId
  getDepartmentsByPostId(ddb, event, context, callback);
};

module.exports.getDepartmentsBySearch = (event, context, callback) => {
  const getDepartmentsBySearch = require('./getDepartmentsBySearch').getDepartmentsBySearch
  getDepartmentsBySearch(ddb, event, context, callback);
};

module.exports.createDepartment = (event, context, callback) => {
  const createDepartment = require('./createDepartment').createDepartment;
  createDepartment(ddb, event, context, callback);
}

module.exports.updateDepartment = (event, context, callback) => {
  const updateDepartment = require('./updateDepartment').updateDepartment;
  updateDepartment(ddb, event, context, callback);
}

module.exports.deleteDepartment = (event, context, callback) => {
  const deleteDepartment = require('./deleteDepartment').deleteDepartment;
  deleteDepartment(ddb, event, context, callback);
}