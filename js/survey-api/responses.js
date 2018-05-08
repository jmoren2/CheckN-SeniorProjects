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

module.exports.multiSurveySuccess = (code, surveys, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            statusCode: code,
            surveys: surveys,
            count: surveys.length
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

<<<<<<< HEAD
module.exports.singleResponseSuccess = (code, category, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            category: category
=======
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
>>>>>>> 973a08ec362f0a996bd010808f7bf2515ee6f3b3
        })
    })
}

<<<<<<< HEAD
module.exports.singleSurveySuccess = (code, category, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            category: category
        })
    })
}
=======
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
>>>>>>> 973a08ec362f0a996bd010808f7bf2515ee6f3b3
