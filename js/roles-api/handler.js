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

module.exports.getRole = (event, context, callback) => {
  const getRole = require('./getRole').getRole;
  getRole(esClient, event, context, callback);
};

module.exports.getAllRoles = (event, context, callback) => {
  const getAllRoles = require('./getAllRoles').getAllRoles;
  getAllRoles(esClient, event, context, callback);
};

module.exports.createRole = (event, context, callback) => {
  const createRole = require('./createRole').createRole;
  createRole(esClient, event, context, callback);
};

/*module.exports.updateRole = (event, context, callback) => {
  const updateRole = require('./updateRole').updateRole;
  updateRole(esClient, event, context, callback);
};*/

module.exports.deleteRole = (event, context, callback) => {
  const deleteRole = require('./deleteRole').deleteRole;
  deleteRole(esClient, event, context, callback);
};

module.exports.mapRolesIndex = (event, context, callback) => {
    const mapIndex = require('./roles-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};