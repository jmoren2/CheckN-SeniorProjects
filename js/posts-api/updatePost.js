'use strict';
const moment = require('moment');
const response = require('./responses.js').singlePostSuccess
const fail = require('./responses').postsFail
module.exports.updatePost = (esClient, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var params = {
            index: 'posts',
            type: 'post',
            id: body.postId,
            body: body
          }
          console.log("Updating the content of a Post...");
          esClient.create(params, function(error, data) {
            if(error) {
              console.log('error: ' + JSON.stringify(error));
              return fail(500, 'Update Post Content failed. Error: ' + error, callback)
            } else {
              console.log('data: ' + JSON.stringify(data));
              return response(200, data, callback)
            }
          });
    }
    else{
        fail(500,'Post content updated failed. Error: JSON body is empty or undefined', callback);
    }
}
