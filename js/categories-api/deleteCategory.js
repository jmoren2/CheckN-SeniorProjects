'use strict';
const deleteCategorySuccess = require('./responses').deleteCategorySuccess;
const deleteCategoryFail = require('./responses').CategoriesFail;

module.exports.deleteCategory = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.category !== undefined && 
            event.pathParameters.category !== null && 
            event.pathParameters.category !== "") {
            
            var category = event.pathParameters.category;
            var params = {
                TableName: "categories",
                Key: {
                    "category" : category
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteCategoryFail(500, 'Delete Category failed. Error: ' + err, callback);
                else
                    return deleteCategorySuccess(callback);
            });
        }
        else
            return deleteCategoryFail(400, 'Delete Category failed.', callback);
    }
    else
        return deleteCategoryFail(400, 'Delete Category failed.', callback);
}
