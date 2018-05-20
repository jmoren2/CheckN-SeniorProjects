'use strict';
const getSingleLocationSuccess = require('./responses').singleLocationSuccess;
const getLocationFail = require('./responses').LocationsFail;

module.exports.getLocation = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.locationId !== undefined && 
            event.pathParameters.locationId !== null && 
            event.pathParameters.locationId !== "") {
            console.log("Received proxy: " + event.pathParameters.locationId);

            var id = event.pathParameters.locationId;
            var params = {
                TableName: "locations",
                Key: {
                    "locationId": id 
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.get(params, function(err, data) {
                if(err)
                    return getLocationFail(500,'get Location by LocationId failed. Error: ' + err, callback);
                else
                    return getSingleLocationSuccess(200, data.Item, callback);
            });
        }
        else
            return getLocationFail(400, 'get Location by LocationId failed.', callback);
    }
    else
        return getLocationFail(400,'get Location by LocationId failed', callback);
}