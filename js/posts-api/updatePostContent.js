'use strict';
  
module.exports.updatePostContent = (ddb, event, context, callback) => {

    //TODO figure out how to get parameters
    var tableName = "posts";
    var newContent = "testContent";
    var item = event.JSON(event.body);
    var params = {
        TableName: tableName,
        Key:{
            "id": event.pathParamaters.postId
        },
    UpdateExpression: "set content = :content",
    ExpressionAttributeValues:{
        ":content":newContent
    },
    ReturnValues:"UPDATED_NEW"
};

    console.log("Updating the content of a Post...");
    ddb.update(params, function(error, data) {
       if(error){
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({message: 'Updating Post content Error: ' + error})
        });
       }
      else{
        callback(null, {
          statusCode: 201,
          body: JSON.stringify({message: 'Post Content Updated.'})
        });
      }
    });
}
