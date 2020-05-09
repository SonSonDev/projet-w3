variable "instance_type" {
  type = string
  default = "t2.micro"
  description = "Instance type"
}

variable "instance_ami" {
  type = string
  description = "AMI to use for instances"
}

variable "instance_key_name" {
  type = string
  description = "AWS EC2 Key name to use for instances"
}

variable "application_name" {
  type = string
  description = "Application name"
}