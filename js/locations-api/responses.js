module.exports.LocationsFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteLocationSuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleLocationSuccess = (code, location, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            location: location
        })
    })
}

module.exports.multiLocationSuccess = (code, locations, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            locations: locations,
            count: locations.length
        })
    })
}
