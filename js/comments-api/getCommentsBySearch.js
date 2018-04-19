'use strict';
const success = require('./responses').multiCommentSuccess;
const fail = require('./responses').CommentsFail;

module.exports.getCommentsBySearch = (ddb, event, context, callback) => {

    // pull search key(s) and user from the query string
    if(event.queryStringParameters) {
        var search = event.queryStringParameters.search;
        var user = event.queryStringParameters.user;
        console.log("Search string: " + search);
        console.log("User string: " + user);
    }

    // todo: users not implemented yet
    user = null;

    if(search || user) {
        // todo: look up user first if 'user' field is defined, early exit if not resolved

        // use + as AND operator when passing strings, of the form:
        // /comments?search=key1+key2+...
        var keyArr = search.split(/[ +]/);
        console.log(keyArr);

        var numKeys = 0;
        var attVals = {};
        var filter = "";

        // NOTE: dynamoDB is case sensitive. Possible solutions: redundant all lowercase searchable data
        // Or, incorporate the elasticsearch framework.

        // dynamically build a filter expression along with attribute values from provided search keys
        for(var i=0; i < keyArr.length; ++i){
            if(keyArr[i]){
                var attKey = ":word" + i;
                attVals[attKey] = keyArr[i];
                if(numKeys > 0)
                    filter += " AND ";
                filter += "contains (#content, " + attKey + ")";
                numKeys++;
            }
        }

        console.log("number of search keys:" + numKeys);

        if(numKeys > 0) {
            console.log(JSON.stringify(attVals));
            console.log(filter);

            var params = {
                TableName: 'comments',
                FilterExpression: filter,
                ExpressionAttributeNames: {
                    "#content": "content"
                },
                ExpressionAttributeValues: attVals
            };

            console.log(params);

            var items = [];

            // scan loop in case of multiple pages of results
            var scanExecute = function (callback) {
                ddb.scan(params, function (err, data) {
                    if (err)
                        return fail(500, 'getCommentsBySearch failed. Error: ' + err, callback);
                    else {
                        console.log(data);

                        items = items.concat(data.Items);

                        if (data.LastEvaluatedKey) {
                            params.ExclusiveStartKey = result.LastEvaluatedKey;
                            scanExecute(callback);
                        }
                        else
                            return success(200, items, callback);
                    }
                })
            };
            scanExecute(callback);
        }
        // if no search keys were found after string parse, abort scan with error
        else
            return fail(500, 'getCommentsBySearch failed. Error: Bad search key(s) provided', callback);
    }
    // missing parameters
    else
        return fail(500, 'getCommentsBySearch failed. Error: No user or search parameters specified', callback);
};