'use strict';

const uuid = require('uuid');
const moment = require('moment');
const fail = require('../comments-api/responses').CommentsFail;
const success = require('../comments-api/responses').singleCommentSuccess;

module.exports.createComment = (esClient, event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        var comment = JSON.parse(event.body);
        comment.commentId = uuid.v4();
        comment.timestamp = moment().toISOString();

        var params = {
            index: 'comments',
            type: 'comment',
            id: comment.commentId,
            body: comment
        };

        esClient.create(params, function(error, data) {
            if(error) {
                console.log('Comment creation failed. error: ' + JSON.stringify(error));
                return fail(400, error, callback);
            } else {
                console.log('data: ' + JSON.stringify(data));
                return success(200, comment, callback);
            }
        });
    }
    else {
        let error = 'Comment creation failed. error: body empty';
        console.log(error);
        return fail(400, error, callback);
    }
};