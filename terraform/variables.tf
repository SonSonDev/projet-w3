variable "ssh_public_key_file" {
  type = string
  description = "Path to key file"
}

variable "production_instance_type" {
  type = string
  description = "Instance type for staging"
  default = "t2.micro"
}

variable "application_name" {
  type = string
  description = "Application name"
  default = "madu"
}