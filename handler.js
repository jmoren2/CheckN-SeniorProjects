'use strict';
const AWS = require('aws-sdk');
const getDogs = require('./js/getDogs').getDogs;
const createDog = require('./js/createDog').createDog;

module.exports.getDogs = (event, context, callback) => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  getDogs(ddb, event, callback);
};

module.exports.createDog = (event, context, callback) => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  createDog(ddb, event, callback);
};
