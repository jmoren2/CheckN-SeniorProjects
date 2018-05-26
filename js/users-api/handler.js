'use strict';
const AWS = require('aws-sdk');
//const ddb = new AWS.DynamoDB.DocumentClient();
const es = require('elasticsearch');
AWS.Config.region = 'us-west-2';
const esClient = es.Client({
    hosts: 'https://search-checkn-dev-2kiktd5jmzuvcarxmggu6tb4ju.us-west-2.es.amazonaws.com',
    connectionClass: require('http-aws-es'),
    amazonES: {
        credentials: new AWS.EnvironmentCredentials('AWS')
    }
});

module.exports.getUserById = (event, context, callback) => {
  const getUserById = require('./getUserById').getUserById;
  getUserById(esClient, event, context, callback);
};

module.exports.getUsersBySearch = (event, context, callback) => {
  const getUsersBySearch = require('./getUsersBySearch').getUsersBySearch;
  getUsersBySearch(esClient, event, context, callback);
};

module.exports.createUser = (event, context, callback) => {
  const createUser = require('./createUser').createUser;
  createUser(esClient, event, context, callback);
};

module.exports.deleteUser = (event, context, callback) => {
  const deleteUser = require('./deleteUser').deleteUser;
  deleteUser(esClient, event, context, callback);
};

module.exports.updateUser = (event, context, callback) => {
  const updateUser = require('./updateUser').updateUser;
  updateUser(esClient, event, context, callback);
};

module.exports.mapUsersIndex = (event, context, callback) => {
    const mapIndex = require('./users-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};