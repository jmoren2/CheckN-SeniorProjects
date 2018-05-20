'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getDepartment = (event, context, callback) => {
  const getDepartment = require('./getDepartment').getDepartment
  getDepartment(ddb, event, context, callback);
};

module.exports.getAllDepartments = (event, context, callback) => {
  const getAllDepartments = require('./getAllDepartments').getAllDepartments;
  getAllDepartments(ddb, event, context, callback);
};

module.exports.createDepartment = (event, context, callback) => {
  const createDepartment = require('./createDepartment').createDepartment;
  createDepartment(ddb, event, context, callback);
};

module.exports.updateDepartment = (event, context, callback) => {
  const updateDepartment = require('./updateDepartment').updateDepartment;
  updateDepartment(ddb, event, context, callback);
};

module.exports.deleteDepartment = (event, context, callback) => {
  const deleteDepartment = require('./deleteDepartment').deleteDepartment;
  deleteDepartment(ddb, event, context, callback);
};

module.exports.mapDepartmentsIndex = (event, context, callback) => {
    const mapIndex = require('./departments-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};