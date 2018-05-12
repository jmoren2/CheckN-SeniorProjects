'use strict';


const success = require('./responses.js').singleCategorySuccess;
const fail = require('./responses.js').CategoriesFail;

module.exports.createCategory = (ddb, event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {

    var body = JSON.parse(event.body);

    var categories = {
        Item: body,
        TableName: 'categories'

    }
    
    ddb.put(categories, function(error, data) {
      if(error) {
        return fail(500, 'Category creation failed. Error: ' + error, callback);
      } else {
        console.log('data: ' + data);
        return success(200, body, callback);
      }
    });
  } else {
    return fail(500, 'Category creation failed.', callback)
  } 
}