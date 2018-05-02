provider "aws" {
  profile = "default"
  region  = "us-west-2"
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

resource "aws_dynamodb_table" "rolesTable" {
  name           = "roles"
  hash_key       = "role"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "role"
    type = "S"
  }
}

resource "aws_dynamodb_table" "departmentsTable" {
  name           = "departments"
  hash_key       = "department"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "department"
    type = "S"
  }
}

resource "aws_dynamodb_table" "categoriesTable" {
  name           = "categories"
  hash_key       = "category"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "category"
    type = "S"
  }
}

resource "aws_elasticsearch_domain" "checkN-dev" {
  domain_name = "checkN-dev-domain"

  cluster_config {
    instance_type  = "t2.small.elasticsearch"
    instance_count = 2
  }
}
