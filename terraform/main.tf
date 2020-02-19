provider "aws" {
  region = "eu-west-3"
}

resource "aws_key_pair" "madu" {
  key_name   = "madu-key-pair"
  public_key = file("${path.module}/id_rsa.pub")
}

resource "aws_instance" "madu-instance" {
  ami             = "ami-087855b6c8b59a9e4"
  instance_type   = "t2.micro"
  key_name        = "madu-key-pair"
  security_groups = [aws_security_group.madu-security-group.name]
  tags = {
    Name = "madu-instance"
  } 
}

resource "aws_default_vpc" "default" {
  tags = {
    Name = "madu vpc"
  }
}

resource "aws_security_group" "madu-security-group" {
  name        = "madu-security-group"
  vpc_id      = aws_default_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}