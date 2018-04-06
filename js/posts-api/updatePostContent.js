'use strict';
  
module.exports.updatePostContent = (ddb, event, context, callback) => {

    //TODO figure out how to get parameters
    var tableName = "Post";
    var newContent = "testContent";
    var item = event.JSON(event.body);
    var params = {
        TableName: tableName,
        Key:{
            "postId": item.postId
        },
    UpdateExpression: "set content = :c",
    ExpressionAttributeValues:{
        ":c":newContent
    },
    ReturnValues:"UPDATED_NEW"
};

    console.log("Updating the content of a Post...");
    ddb.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update content for a Post. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Update Post Content succeeded:", JSON.stringify(data, null, 2));
        }
    });

    var response = {
        statusCode: 500,
        body: JSON.stringify({
            statusCode: 500,
            message: 'endpoint not implemented yet'
        })
    }
    return callback(null, response);
}
