'use strict';
const getSingleCategorySuccess = require('./responses').singleCategorySuccess;
const getCategoryFail = require('./responses').CategoriesFail;

module.exports.getCategory = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.category !== undefined && 
            event.pathParameters.category !== null && 
            event.pathParameters.category !== "") {
            console.log("Received proxy: " + event.pathParameters.category);

            var category = event.pathParameters.category;
            var params = {
                TableName: "categories",
                Key: {
                    "category": category 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getCategoryFail(500,'get Category by Category failed. Error: ' + err, callback);
                else
                    return getSingleCategorySuccess(200, data.Item, callback);
            });
        }
        else
            return getCategoryFail(400, 'get Category by roleCategory failed.', callback);
    }
    else
        return getCategoryFail(400,'get Category by Category failed', callback);
}