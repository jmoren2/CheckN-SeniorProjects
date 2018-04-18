'use strict';
const fail = require('./responses').postsFail;
const success = require('./responses').multiPostSuccess;

module.exports.getPostsBySearch = (ddb, event, context, callback) => {

    console.log(event.body);

    // initial test case
    var params = {
        TableName: 'posts',
        KeyConditionExpression: "#state = :state",
        ExpressionAttributeNames: {
            "#state": "state"
        },
        ExpressionAttributeValues: {
            ":state": "OPEN"
        }
    };

    console.log(params);

    var items = [];

    // query loop in case of multiple pages
    var queryExecute = function(callback) {
        ddb.query(params, function(err, data) {
            if(err)
                return fail(500, 'getPostsBySearch failed. Error: ' + err, callback);
            else {
                console.log(data);

                items = items.concat(data.Items);

                if(data.LastEvaluatedKey) {
                    params.ExclusiveStartKey = result.LastEvaluatedKey;
                    queryExecute(callback);
                }
                else
                    return success(200, items, callback);
            }
        })
    };

    queryExecute(callback);
};