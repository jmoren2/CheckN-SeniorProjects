provider "aws" {
  region  = "us-west-2"
  profile = "default"
}

resource "aws_s3_bucket" "checkn-terraform-state" {
  bucket = "checkn-tf-remote"
  acl    = "private"
}

resource "aws_dynamodb_table" "checkN-terraform-lock" {
  name           = "checkn-tf-lock"
  hash_key       = "LockId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "LockId"
    type = "S"
  }
}
