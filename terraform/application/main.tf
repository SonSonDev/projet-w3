resource "aws_instance" "application" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  key_name        = var.instance_key_name

  security_groups = [aws_security_group.application.name]

  tags = {
    component     = "${var.application_name}_app"
    Name          = "${var.application_name}_app"
  }
}

resource "aws_security_group" "application" {
  name          = "${var.application_name}_security_group"
  description   = "Application security group"
  
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
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.application_name}_security_group"
  }
}
