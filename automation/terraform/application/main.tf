
# api

resource "aws_instance" "api" {
  ami               = var.aws_ami_id
  instance_type     = var.api_instance_type
  count             = var.api_count
  availability_zone = var.api_availability_zone

  security_groups = [aws_security_group.api.name]

  tags = {
    component = "api"
    stage     = var.stage
    Name      = "${var.stage}-api"
  }
  key_name = var.keypair_keyname
}

resource "aws_security_group" "api" {
  name = "${var.stage}-api"

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
  name               = "${var.stage}-elb-api"
  availability_zones = [var.api_availability_zone]

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

  tags = {
    Name = "api-${var.stage}"
  }
}

# database

resource "aws_instance" "database" {
  ami               = var.aws_ami_id
  instance_type     = var.database_instance_type
  count             = var.database_count
  availability_zone = var.database_availability_zone

  security_groups = [aws_security_group.database.name]

  tags = {
    component = "database"
    stage     = var.stage
    Name      = "${var.stage}-database"
  }
  key_name = var.keypair_keyname
}

resource "aws_security_group" "database" {
  name = "${var.stage}-database"

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
  ami               = var.aws_ami_id
  instance_type     = var.back_office_instance_type
  count             = var.back_office_count
  availability_zone = var.back_office_availability_zone

  security_groups = [aws_security_group.back_office.name]

  tags = {
    component = "back_office"
    stage     = var.stage
    Name      = "${var.stage}-back_office"
  }
  key_name = var.keypair_keyname
}

resource "aws_security_group" "back_office" {
  name = "${var.stage}-back_office"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32", "0.0.0.0/0"]
  }

  ingress {
    description = "Back office ${var.stage}"
    from_port   = 80
    to_port     = 80
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
  bucket = "madu-${var.stage}"
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
      "Resource": "arn:aws:s3:::${aws_s3_bucket.s3.bucket}/*"
    }
  ]
}
POLICY
}
