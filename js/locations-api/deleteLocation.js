'use strict';
const deleteLocationFail = require('./responses').LocationsFail;
const deleteLocationSuccess = require('./responses').deleteLocationSuccess;

module.exports.deleteLocation = (ddb, event, context, callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.locationId !== undefined && 
            event.pathParameters.locationId !== null && 
            event.pathParameters.locationId !== "") {
            
            var id = event.pathParameters.locationId;
            var params = {
                TableName: "locations",
                Key: {
                    "locationId" : id
                }
            };

            console.log("Attempting a conditional delete...");
    
            ddb.delete(params, function(err, data) {
                if(err)
                    return deleteLocationFail(500, 'Delete Location failed. Error: ' + err, callback);
                else
                    return deleteLocationSuccess(callback);
            });
        }
        else
            return deleteLocationFail(400, 'Delete Location failed.', callback);
    }
    else
        return deleteLocationFail(400, 'Delete Location failed.', callback);
}