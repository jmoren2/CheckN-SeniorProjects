'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getRolesByPostId = (event, context, callback) => {
  const getRolesByPostId = require('./getRolesByPostId').getRolesByPostId
  getRolesByPostId(ddb, event, context, callback);
};

module.exports.getAllRoles = (event, context, callback) => {
  const getAllRoles = require('./getAllRoles').getAllRoles;
  getAllRoles(ddb, event, context, callback);
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