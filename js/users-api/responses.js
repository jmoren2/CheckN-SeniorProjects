module.exports.usersFail = (code, msg, callback) => {
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

module.exports.deleteUserSuccess = (callback) => {
    return callback(null, {
        statusCode: 204,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
}

module.exports.singleUserSuccess = (code, user, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            statusCode: code,
            user: user
        })
    })
}

module.exports.multiUserSuccess = (code, users, callback) => {
    return callback(null, {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            statusCode: code,
            users: users,
            count: users.length
        })
    })
}