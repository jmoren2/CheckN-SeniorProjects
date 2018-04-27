module.exports.RolesFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteRoleSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleRoleSuccess = (code, role, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            role: role
        })
    })
}

module.exports.multiRoleSuccess = (code, roles, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            roles: roles,
            count: roles.length
        })
    })
}
