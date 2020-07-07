# 

provider "aws" {
  version = "~> 2.0"
  region  = var.region
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

module "staging" {
  source = "./application"

  stage = "staging"
  keypair_keyname = aws_key_pair.key_pair.key_name
  aws_ami_id = data.aws_ami.ubuntu.id
}

# module "production" {
#   source = "./application"

#   stage = "production"
#   keypair_keyname = aws_key_pair.key_pair.key_name
#   aws_ami_id = data.aws_ami.ubuntu.id
# }
