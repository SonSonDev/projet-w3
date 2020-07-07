variable "region" {
  type = string
  default = "eu-west-2"
}

variable "ssh_public_key" {
  type = string
  description = "Ssh public key"
}

variable "application_name" {
  type = string
  description = "Application name"
  default = "madu"
}