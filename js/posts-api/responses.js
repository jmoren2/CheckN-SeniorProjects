module.exports.postsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            message: msg
        })
    });
}

module.exports.deletePostSuccess = (callback) => {
    return callback(null, {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
}

module.exports.singlePostSuccess = (code, post, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials":false,
            "Access-Control-Allow-Methods":["POST","GET","OPTIONS"],
            "Access-Control-Allow-Headers":[
                "Content-Type",
                "X-Amz-Date",
                "Authorization",
                "X-Api-Key",
                "X-Amz-Security-Token"
            ],
            "Content-Type":"application/json"
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
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            statusCode: code,
            posts: posts,
            count: posts.length
        })
    })
}