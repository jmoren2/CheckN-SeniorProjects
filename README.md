# CheckN
----------

Before deploying this program for the first time run the following in cmd:
* aws configure
* npm install serverless -g

To setup terraform for the first time:
* Install terraform from https://www.terraform.io/
* In cmd: cd terraform/backend && terraform apply
    * type yes when prompted

To deploy the elasticsearch domain in cmd:
* cd terraform/dev
* terraform apply
    * type yes when prompted

To fully deploy all backend functions to aws:
* serverless deploy --region us-west-2 --stage dev
    * us-west-2 can be replaced with a different aws region and dev can be replaced with a different stage of your choice

To deploy single function to aws:
* serverless deploy function --function function-name --region us-west-2 --stage dev

To deploy frontend to s3:
* cd frontend
* npm run build && aws s3 sync build/ s3://checkn-frontend
    * replace checkn-frontend witht he name of your s4 bucket that will host the site
    * make sure your bucket is configured for static website hosting
