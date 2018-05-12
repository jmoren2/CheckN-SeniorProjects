'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/* --------------- Survey handlers --------------- */
module.exports.getSurveyById = (event, context, callback) => {
  const getSurveyById = require('./survey/getSurveyById').getSurveyById;
  getSurveyById(ddb, event, context, callback);
};

module.exports.getSurveysBySearch = (event, context, callback) => {
  const getSurveysBySearch = require('./survey/getSurveysBySearch').getSurveysBySearch;
  getSurveysBySearch(ddb, event, context, callback);
};

module.exports.createSurvey = (event, context, callback) => {
  const createSurvey = require('./survey/createSurvey').createSurvey;
  createSurvey(ddb, event, context, callback);
};

module.exports.deleteSurvey = (event, context, callback) => {
  const deleteSurvey = require('./survey/deleteSurvey').deleteSurvey;
  deleteSurvey(ddb, event, context, callback);
}

module.exports.updateSurvey = (event, context, callback) => {
  const updateSurvey = require('./survey/updateSurvey').updateSurvey;
  updateSurvey(ddb, event, context, callback);
}

/* --------------- Survey Response handlers --------------- */
module.exports.getResponseById = (event, context, callback) => {
    const getResponseById = require('./responses/getResponseById').getResponseById;
    getResponseById(ddb, event, context, callback);
};

module.exports.createResponse = (event, context, callback) => {
    const createResponse = require('./responses/createResponse').createResponse;
    createResponse(ddb, event, context, callback);
};

module.exports.deleteResponse = (event, context, callback) => {
    const deleteResponse = require('./responses/deleteResponse').deleteResponse;
    deleteResponse(ddb, event, context, callback);
}

module.exports.updateResponse = (event, context, callback) => {
    const updateResponse = require('./responses/updateResponse').updateResponse;
    updateResponse(ddb, event, context, callback);
}
