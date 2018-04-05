# technology-speaks
----------

Before deploying this program for the first time run the following in cmd:
* aws configure
* npm install serverless -g

To fully deploy everything to aws:
* serverless deploy --region us-west-2 --stage dev

To deploy single function to aws:
* serverless deploy function --function <function-name> --region us-west-2 --stage dev

----------

Endpoints you can hit using Postman/Curl/your favorite http tool:
* GET https://m75nxs0yvj.execute-api.us-west-2.amazonaws.com/dev/posts/1
* POST https://m75nxs0yvj.execute-api.us-west-2.amazonaws.com/dev/posts
* DELETE https://m75nxs0yvj.execute-api.us-west-2.amazonaws.com/dev/posts/1
* PUT https://m75nxs0yvj.execute-api.us-west-2.amazonaws.com/dev/posts/1
* PUT https://m75nxs0yvj.execute-api.us-west-2.amazonaws.com/dev/posts/1/stage/CLOSED