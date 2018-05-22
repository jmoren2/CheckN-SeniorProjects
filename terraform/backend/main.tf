provider "aws" {
  region  = "us-west-2"
  profile = "default"
}

resource "aws_s3_bucket" "checkn-terraform-state" {
  bucket = "checkn-terraform-remote"
  acl    = "private"
}

resource "aws_dynamodb_table" "checkN-terraform-lock" {
  name           = "checkN-terraform-lock"
  hash_key       = "LockId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "LockId"
    type = "S"
  }
}
