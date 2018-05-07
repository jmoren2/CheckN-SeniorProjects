'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

// Surveys
module.exports.getSurveyById = (event, context, callback) => {
  const getSurveyById = require('./getSurveyById').getSurveyById;
  getSurveyById(ddb, event, context, callback);
};

module.exports.getSurveysBySearch = (event, context, callback) => {
  const getSurveysBySearch = require('./getSurveysBySearch').getSurveysBySearch;
  getSurveysBySearch(ddb, event, context, callback);
};

module.exports.createSurvey = (event, context, callback) => {
  const createSurvey = require('./createSurvey').createSurvey;
  createSurvey(ddb, event, context, callback);
};

module.exports.deleteSurvey = (event, context, callback) => {
  const deleteSurvey = require('./deleteSurvey').deleteSurvey;
  deleteSurvey(ddb, event, context, callback);
}

module.exports.updateSurvey = (event, context, callback) => {
  const updateSurvey = require('./updateSurvey').updateSurvey;
  updateSurvey(ddb, event, context, callback);
}

// Responses
module.exports.getResponseById = (event, context, callback) => {
    const getResponseById = require('./getResponseById').getResponseById;
    getResponseById(ddb, event, context, callback);
};

module.exports.createResponse = (event, context, callback) => {
    const createResponse = require('./createResponse').createResponse;
    createResponse(ddb, event, context, callback);
};

module.exports.deleteResponse = (event, context, callback) => {
    const deleteResponse = require('./deleteResponse').deleteResponse;
    deleteResponse(ddb, event, context, callback);
}

module.exports.updateResponse = (event, context, callback) => {
    const updateResponse = require('./updateResponse').updateResponse;
    updateResponse(ddb, event, context, callback);
}