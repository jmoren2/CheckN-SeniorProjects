module.exports.CategoriesFail = (code, msg, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            message: msg
        })
    });
}

module.exports.deleteCategorySuccess = (callback) => {
    return callback(null, {
        statusCode: 204
    });
}

module.exports.singleCategorySuccess = (code, category, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            category: category
        })
    })
}

module.exports.multiCategorySuccess = (code, categories, callback) => {
    return callback(null, {
        statusCode: code,
        body: JSON.stringify({
            statusCode: code,
            categories: categories,
            count: categories.length
        })
    })
}
