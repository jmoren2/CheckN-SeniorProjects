module.exports.DepartmentsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteDepartmentSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleDepartmentSuccess = (code, department, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            department: department
        })
    })
}

module.exports.multiDepartmentSuccess = (code, departments, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            departments: departments,
            count: departments.length
        })
    })
}
