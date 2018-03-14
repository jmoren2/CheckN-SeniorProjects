# technology-speaks
----------

Before deploying this program for the first time run the following in cmd:
* aws configure
* npm install serverless -g

To deploy to aws:
* serverless deploy --region us-west-2

----------

Endpoints you can hit using Postman/Curl/your favorite http tool:
* GET https://ctozzlofrk.execute-api.us-west-2.amazonaws.com/dev/dogs
* POST https://ctozzlofrk.execute-api.us-west-2.amazonaws.com/dev/dogs
    * body for POST, change at least the id to something new: 
    {
        "id": "3",
        "name": "Petunia",
        "breed": "pit bull",
        "age": 9
    }