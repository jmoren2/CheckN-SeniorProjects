/* --------------- Survey API --------------- */
module.exports.SurveyFail = (code, msg, callback) => {
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

module.exports.deleteSurveySuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleSurveySuccess = (code, comment, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            comment: comment
        })
    })
}

module.exports.multiSurveySuccess = (code, comments, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            comments: comments,
            count: comments.length
        })
    })
}

/* --------------- Survey Response API --------------- */
module.exports.ResponseFail = (code, msg, callback) => {
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

module.exports.deleteResponseSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleResponseSuccess = (code, comment, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            comment: comment
        })
    })
}

module.exports.multiResponseSuccess = (code, comments, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            comments: comments,
            count: comments.length
        })
    })
}
