'use strict';

const success = require('./responses.js').singleTagSuccess;
const fail = require('./responses.js').tagsFail;

module.exports.createTag = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);
    var tag = body.tag;
    var tag = {
        Item: {"tag" : tag},
        TableName: 'tags'

    }
    
    ddb.put(tag, function(error, data) {
      if(error) {
        return fail(500, 'Tag creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Tag creation failed.', callback)
  } 
}