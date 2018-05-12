module.exports.tagsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            message: msg
        })
    });
}

module.exports.deleteTagSuccess = (callback) => {
    return callback(null, {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    });
}

module.exports.singleTagSuccess = (code, tag, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
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
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            tags: tags,
            count: tags.length
        })
    })
}