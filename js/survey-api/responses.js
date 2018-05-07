module.exports.ResponseFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.SurveyFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteResopnseSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.deleteSurveySuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleResponseSuccess = (code, category, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            category: category
        })
    })
}

module.exports.singleSurveySuccess = (code, category, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            category: category
        })
    })
}