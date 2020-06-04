# 

provider "aws" {
  version = "~> 2.0"
  region  = "eu-west-2"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"]
}

resource "aws_key_pair" "key_pair" {
  key_name   = "key_pair"
  public_key = var.ssh_public_key
}

# api

resource "aws_instance" "api" {
  ami               = data.aws_ami.ubuntu.id
  instance_type     = "t2.micro"
  count             = 1
  availability_zone = "eu-west-2a"

  security_groups = [aws_security_group.api.name]

  tags = {
    Name      = "api"
    component = "api"
  }
  key_name = aws_key_pair.key_pair.key_name
}

resource "aws_security_group" "api" {
  name = "api"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32", "0.0.0.0/0"]
  }

  ingress {
    description = "HTTP web app"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "elb" {
  name               = "elb"
  availability_zones = ["eu-west-2a"]

  listener {
    lb_port           = 80
    lb_protocol       = "http"
    instance_port     = 3000
    instance_protocol = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:3000/"
    interval            = 30
  }

  instances                   = aws_instance.api.*.id
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400
}

# database

resource "aws_instance" "database" {
  ami               = data.aws_ami.ubuntu.id
  instance_type     = "t2.micro"
  count             = 1
  availability_zone = "eu-west-2a"

  security_groups = [aws_security_group.database.name]

  tags = {
    Name      = "database"
    component = "database"
  }
  key_name = aws_key_pair.key_pair.key_name
}

resource "aws_security_group" "database" {
  name = "database"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32", "0.0.0.0/0"]
  }

  ingress {
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    cidr_blocks = ["0.0.0.0/32", "0.0.0.0/0"]
    security_groups = [aws_security_group.api.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# back_office

resource "aws_instance" "back_office" {
  ami               = data.aws_ami.ubuntu.id
  instance_type     = "t2.micro"
  count             = 1
  availability_zone = "eu-west-2a"

  security_groups = [aws_security_group.back_office.name]

  tags = {
    Name      = "back_office"
    component = "back_office"
  }
  key_name = aws_key_pair.key_pair.key_name
}

resource "aws_security_group" "back_office" {
  name = "back_office"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32", "0.0.0.0/0"]
  }

  ingress {
    description = "Back office"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "App web"
    from_port   = 19006
    to_port     = 19006
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# s3

resource "aws_s3_bucket" "s3" {
  bucket = "madu-staging"
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "s3" {
  bucket = aws_s3_bucket.s3.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::madu-staging/*"
    }
  ]
}
POLICY
}
