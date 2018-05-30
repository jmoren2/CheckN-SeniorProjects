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

module.exports.singleSurveySuccess = (code, survey, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            survey: survey
        })
    })
}

module.exports.multiSurveysSuccess = (code, surveys, context, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            Surveys: surveys,
            total: context.totalPosts,
            pages: Math.ceil(context.totalPosts / context.pageSize)
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

module.exports.singleResponseSuccess = (code, response, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            response: response
        })
    })
}

module.exports.multiResponseSuccess = (code, responses, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            responses: responses,
            count: responses.length
        })
    })
}