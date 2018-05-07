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
  name           = "users-${var.stage}"
  hash_key       = "userId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "userId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "tagsTable" {
  name           = "tags-${var.stage}"
  hash_key       = "tag"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "tag"
    type = "S"
  }
}

resource "aws_dynamodb_table" "postsTable" {
  name           = "posts-${var.stage}"
  hash_key       = "postId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "postId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "commentsTable" {
  name           = "comments-${var.stage}"
  hash_key       = "commentId"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "commentId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "rolesTable" {
  name           = "roles-${var.stage}"
  hash_key       = "role"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "role"
    type = "S"
  }
}

resource "aws_dynamodb_table" "departmentsTable" {
  name           = "departments-${var.stage}"
  hash_key       = "department"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "department"
    type = "S"
  }
}

resource "aws_dynamodb_table" "categoriesTable" {
  name           = "categories-${var.stage}"
  hash_key       = "category"
  write_capacity = 5
  read_capacity  = 5

  attribute {
    name = "category"
    type = "S"
  }
}

resource "aws_elasticsearch_domain" "checkNDomain" {
  domain_name = "checkn-${var.stage}"

  cluster_config {
    instance_type  = "t2.small.elasticsearch"
    instance_count = 2
  }
}
