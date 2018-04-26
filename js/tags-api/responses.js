module.exports.tagsFail = (code, msg, callback) => {
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

module.exports.deleteTagSuccess = (callback) => {
    return callback(null, {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
}

module.exports.singleTagSuccess = (code, tag, callback) => {
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
            tag: tag
        })
    })
}

module.exports.multiTagSuccess = (code, tags, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            statusCode: code,
            tags: tags,
            count: tags.length
        })
    })
}