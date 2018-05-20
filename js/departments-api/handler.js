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

module.exports.getDepartment = (event, context, callback) => {
  const getDepartment = require('./getDepartment').getDepartment;
  getDepartment(esClient, event, context, callback);
};

module.exports.getAllDepartments = (event, context, callback) => {
  const getAllDepartments = require('./getAllDepartments').getAllDepartments;
  getAllDepartments(esClient, event, context, callback);
};

module.exports.createDepartment = (event, context, callback) => {
  const createDepartment = require('./createDepartment').createDepartment;
  createDepartment(esClient, event, context, callback);
};

/*module.exports.updateDepartment = (event, context, callback) => {
  const updateDepartment = require('./updateDepartment').updateDepartment;
  updateDepartment(esClient, event, context, callback);
};*/

module.exports.deleteDepartment = (event, context, callback) => {
  const deleteDepartment = require('./deleteDepartment').deleteDepartment;
  deleteDepartment(esClient, event, context, callback);
};

module.exports.mapDepartmentsIndex = (event, context, callback) => {
    const mapIndex = require('./departments-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};