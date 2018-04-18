module.exports.CommentsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteCommentSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleCommentSuccess = (code, comment, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            comment: comment
        })
    })
}

module.exports.multiCommentSuccess = (code, comments, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            comments: comments,
            count: comment.length
        })
    })
}
