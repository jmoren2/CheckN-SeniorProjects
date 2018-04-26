'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getUserById = (event, context, callback) => {
  const getUserById = require('./getUserById').getUserById;
  getUserById(ddb, event, context, callback);
};

module.exports.getUsersBySearch = (event, context, callback) => {
  const getUsersBySearch = require('./getUsersBySearch').getUsersBySearch;
  getUsersBySearch(ddb, event, context, callback);
};

module.exports.createUser = (event, context, callback) => {
  const createUser = require('./createUser').createUser;
  createUser(ddb, event, context, callback);
};

module.exports.deleteUser = (event, context, callback) => {
  const deleteUser = require('./deleteUser').deleteUser;
  deleteUser(ddb, event, context, callback);
}

module.exports.updateUser = (event, context, callback) => {
  const updateUser = require('./updateUser').updateUser;
  updateUser(ddb, event, context, callback);
}