variable "stage" {
  type    = string
  default = "staging"
}
variable "keypair_keyname" {
  type = string
}
variable "aws_ami_id" {
  type = string
}

# api

variable "api_instance_type" {
  type        = string
  default     = "t2.micro"
}
variable "api_count" {
  type        = number
  default     = 1
}
variable "api_availability_zone" {
  type        = string
  default     = "eu-west-2a"
}

# database

variable "database_instance_type" {
  type        = string
  default     = "t2.micro"
}
variable "database_count" {
  type        = number
  default     = 1
}
variable "database_availability_zone" {
  type        = string
  default     = "eu-west-2a"
}

# back_office

variable "back_office_instance_type" {
  type        = string
  default     = "t2.micro"
}
variable "back_office_count" {
  type        = number
  default     = 1
}
variable "back_office_availability_zone" {
  type        = string
  default     = "eu-west-2a"
}
