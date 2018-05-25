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

module.exports.getDepartmentReport = (event, context, callback) => {
  const getDepartmentReport = require('./getDepartmentReport').getDepartmentReport;
  getDepartmentReport(esClient, event, context, callback);
};

module.exports.getAllDepartmentsReport = (event, context, callback) => {
  const getAllDepartmentsReport = require('./getAllDepartmentsReport').getAllDepartmentsReport;
  getAllDepartmentsReport(esClient, event, context, callback);
};
