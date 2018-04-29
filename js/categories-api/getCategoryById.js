'use strict';
const getSingleCategorySuccess = require('./responses').singleCategorySuccess;
const getCategoryFail = require('./responses').CategoriesFail;

module.exports.getCategoryById = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.categoryId !== undefined && 
            event.pathParameters.categoryId !== null && 
            event.pathParameters.categoryId !== "") {
            console.log("Received proxy: " + event.pathParameters.categoryId);

            var id = event.pathParameters.categoryId;
            var params = {
                TableName: "categories",
                Key: {
                    "categoryId": id 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getCategoryFail(500,'get Category by CategoryId failed. Error: ' + err, callback);
                else
                    return getSingleCategorySuccess(200, data.Item, callback);
            });
        }
        else
            return getCategoryFail(400, 'get Category by roleCategoryId failed.', callback);
    }
    else
        return getCategoryFail(400,'get Category by CategoryId failed', callback);
}