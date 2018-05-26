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


/* --------------- Survey handlers --------------- */
module.exports.getSurveyById = (event, context, callback) => {
  const getSurveyById = require('./surveys/getSurveyById').getSurveyById;
  getSurveyById(esClient, event, context, callback);
};

module.exports.getSurveysBySearch = (event, context, callback) => {
  const getSurveysBySearch = require('./surveys/getSurveysBySearch').getSurveysBySearch;
  getSurveysBySearch(esClient, event, context, callback);
};

module.exports.createSurvey = (event, context, callback) => {
  const createSurvey = require('./surveys/createSurvey').createSurvey;
  createSurvey(esClient, event, context, callback);
};

module.exports.deleteSurvey = (event, context, callback) => {
  const deleteSurvey = require('./surveys/deleteSurvey').deleteSurvey;
  deleteSurvey(esClient, event, context, callback);
};

module.exports.updateSurvey = (event, context, callback) => {
  const updateSurvey = require('./surveys/updateSurvey').updateSurvey;
  updateSurvey(esClient, event, context, callback);
};

module.exports.mapSurveysIndex = (event, context, callback) => {
    const mapIndex = require('./surveys/surveys-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};

/* --------------- Survey Response handlers --------------- */
module.exports.getResponseById = (event, context, callback) => {
    const getResponseById = require('./responses/getResponseById').getResponseById;
    getResponseById(esClient, event, context, callback);
};

module.exports.createResponse = (event, context, callback) => {
    const createResponse = require('./responses/createResponse').createResponse;
    createResponse(esClient, event, context, callback);
};

module.exports.deleteResponse = (event, context, callback) => {
    const deleteResponse = require('./responses/deleteResponse').deleteResponse;
    deleteResponse(esClient, event, context, callback);
};

module.exports.updateResponse = (event, context, callback) => {
    const updateResponse = require('./responses/updateResponse').updateResponse;
    updateResponse(esClient, event, context, callback);
};

module.exports.mapResponsesIndex = (event, context, callback) => {
    const mapIndex = require('./responses/responses-index-mapping').mapIndex;
    mapIndex(esClient, event, context, callback);
};