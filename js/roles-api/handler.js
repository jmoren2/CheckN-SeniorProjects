'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getRole = (event, context, callback) => {
  const getRole = require('./getRole').getRole
  getRole(ddb, event, context, callback);
};

module.exports.getRolesBySearch = (event, context, callback) => {
  const getRolesBySearch = require('./getRolesBySearch').getRolesBySearch
  getRolesBySearch(ddb, event, context, callback);
};

module.exports.createRole = (event, context, callback) => {
  const createRole = require('./createRole').createRole;
  createRole(ddb, event, context, callback);
}

module.exports.updateRole = (event, context, callback) => {
  const updateRole = require('./updateRole').updateRole;
  updateRole(ddb, event, context, callback);
}

module.exports.deleteRole = (event, context, callback) => {
  const deleteRole = require('./deleteRole').deleteRole;
  deleteRole(ddb, event, context, callback);
}