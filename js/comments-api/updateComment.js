'use strict';
const moment = require('moment');
const success = require('./responses').singleCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.updateComment = (ddb, event, context, callback) => {
    if(event.body !== null && event.body !== undefined){
        var body = JSON.parse(event.body);
        body.timestamp = moment().toISOString();

        console.log(body);

        var params = {
            index: 'comments',
            type: 'comment',
            id: body.commentId,
            body: body
        };

        console.log("Updating a Comment...");
        ddb.update(params, function(error, data) {
          if(error)
            fail(500, 'Update Comment failed. Error: ' + error, callback);
          else
            success(200, body, callback);
        });
    }
    else{
        fail(500,'Comment updated failed. Error: undefined or empty JSON body', callback )
    }
};