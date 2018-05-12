'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getLocationsByPostId = (event, context, callback) => {
  const getLocationsByPostId = require('./getLocationsByPostId').getLocationsByPostId
  getLocationsByPostId(ddb, event, context, callback);
};

module.exports.getLocationsBySearch = (event, context, callback) => {
  const getLocationsBySearch = require('./getLocationsBySearch').getLocationsBySearch
  getLocationsBySearch(ddb, event, context, callback);
};

module.exports.createLocation = (event, context, callback) => {
  const createLocation = require('./createLocation').createLocation;
  createLocation(ddb, event, context, callback);
}

module.exports.updateLocation = (event, context, callback) => {
  const updateLocation = require('./updateLocation').updateLocation;
  updateLocation(ddb, event, context, callback);
}

module.exports.deleteLocation = (event, context, callback) => {
  const deleteLocation = require('./deleteLocation').deleteLocation;
  deleteLocation(ddb, event, context, callback);
}