provider "aws" {
  version = "~> 2.0"
  region = "eu-west-2"
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
  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "app_key" {
  key_name = "${var.application_name}_key"
  # public_key = file(var.ssh_public_key_file)
  public_key = var.ssh_public_key
}

module "application" {
  source = "./application"

  instance_type = var.production_instance_type
  instance_ami = data.aws_ami.ubuntu.id
  instance_key_name = aws_key_pair.app_key.key_name
  application_name = var.application_name
}
