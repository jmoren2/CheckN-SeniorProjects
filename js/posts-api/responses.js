module.exports.postsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: {
            statusCode: code,
            message: msg
        }
    });
}

module.exports.deletePostSuccess = () => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singlePostSuccess = (code, post, callback) => {
    return callback(null, {
        statusCode: code,
        body: {
            statusCode: code,
            post: post
        }
    })
}

module.exports.multiPostSuccess = (code, posts, callback) => {
    return callback(null, {
        statusCode: code,
        body: {
            statusCode: code,
            posts: posts,
            count: posts.length
        }
    })
}