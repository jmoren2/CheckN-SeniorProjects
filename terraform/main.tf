provider "aws" {
  access_key = "AKIAJXKANNCQZUYLEVZQ"
  secret_key = "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"
  region     = "us-west-2"
}

terraform {
  backend "s3" {
    bucket = "checkn-terraform-remote"
    key    = "terraform-state"
    region = "us-west-2"
  }
}

resource "aws_dynamodb_table" "usersTable" {
  name           = "users"
  hash_key       = "userId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "userId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "tagsTable" {
  name           = "tags"
  hash_key       = "tagId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "tagId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "postsTable" {
  name           = "posts"
  hash_key       = "postId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "postId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "commentsTable" {
  name           = "comments"
  hash_key       = "commentId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "commentId"
    type = "S"
  }
}
