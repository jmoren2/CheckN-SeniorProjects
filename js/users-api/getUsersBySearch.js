'use strict';
const success = require('./responses').multiUserSuccess;
const fail = require('./responses').usersFail;

module.exports.getUsersBySearch = (ddb, event, context, callback) => {

    // pull search key(s) and email from the query string
    if(event.queryStringParameters) {
        var nameSearch = event.queryStringParameters.namesearch;
        var email = event.queryStringParameters.email;
        console.log("Search string: " + nameSearch);
        console.log("Email string: " + email);
    }

    if(nameSearch || email) {
        // todo: look up user first if 'user' field is defined, early exit if not resolved

        var numKeys = 0;
        var attVals = {};
        var expAtts = {};
        var filter = "";

        // NOTE: dynamoDB is case sensitive. Possible solutions: redundant all lowercase searchable data
        // Or, incorporate the elasticsearch framework.

        // todo: validate e-mail formatting, prioritize e-mail as a search key.

        if (nameSearch) {
            // use + as AND operator when passing strings, of the form:
            // /users?namesearch=key1+key2+...
            var keyArr = nameSearch.split(/[ +]/);
            console.log(keyArr);

            // dynamically build a filter expression along with attribute values from provided search keys
            for (var i = 0; i < keyArr.length; ++i) {
                if (keyArr[i]) {
                    var attKey = ":word" + i;
                    attVals[attKey] = keyArr[i];
                    if (numKeys > 0)
                        filter += " AND ";
                    filter += "contains (#firstName, " + attKey + ")";
                    filter += " OR ";
                    filter += "contains (#lastName, " + attKey + ")";
                    numKeys += 2;
                }
            }

            if (numKeys > 0) {
                expAtts["#firstName"] = "firstName";
                expAtts["#lastName"] = "lastName";
            }
        }

        if(email) {
            var attKey = ":emailWord";
            attVals[attKey] = email;
            if (numKeys > 0)
                filter += " OR ";
            filter += "contains (#email, " + attKey + ")";
            numKeys++;
            expAtts["#email"] = "email";
        }

        console.log("number of search keys:" + numKeys);

        if(numKeys > 0) {
            console.log(JSON.stringify(attVals));
            console.log(JSON.stringify(expAtts));
            console.log(filter);

            var params = {
                TableName: 'users',
                FilterExpression: filter,
                ExpressionAttributeNames: expAtts,
                ExpressionAttributeValues: attVals
            };

            console.log(params);

            var items = [];

            // todo: build indices on e-mail, maybe on first/last name?
            // scan loop in case of multiple pages of results
            var scanExecute = function (callback) {
                ddb.scan(params, function (err, data) {
                    if (err)
                        return fail(500, 'getUsersBySearch failed. Error: ' + err, callback);
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
            return fail(500, 'getUsersBySearch failed. Error: Bad search key(s) provided', callback);
    }
    // missing parameters
    else
        return fail(500, 'getUsersBySearch failed. Error: No email or search parameters specified', callback);
};