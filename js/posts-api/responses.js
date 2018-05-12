module.exports.postsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deletePostSuccess = (callback) => {
    return callback(null, {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    });
}

module.exports.singlePostSuccess = (code, post, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            post: post
        })
    })
}

module.exports.multiPostSuccess = (code, posts, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            posts: posts,
            count: posts.length
        })
    })
}