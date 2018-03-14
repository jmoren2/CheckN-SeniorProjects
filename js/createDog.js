'use strict';

module.exports.createDog = (ddb, event, callback) => {
    var dog = {
      Item: JSON.parse(event.body),
      TableName: 'dogs'
    }
    console.log(dog);
  
    ddb.put(dog, function(error, data) {
      if(error)
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({message: 'create dog failed. Error: ' + error})
        });
      else
        callback(null, {
          statusCode: 201,
          body: JSON.stringify({message: 'dog created.'})
        });
    });
}