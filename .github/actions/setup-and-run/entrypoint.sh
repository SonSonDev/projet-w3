#!/bin/sh

echo $INPUT_VAULT_PASS > ~/vault_pass
ansible-vault decrypt .env.encrypted --output .env --vault-password-file=~/vault_pass

set -a && . ./.env && set +a


echo $SSH_PRIVATE_KEY > ~/id_rsa
chmod 600 ~/id_rsa

cd ./automation/ansible
ansible-galaxy install -r requirements.yml
chmod 777 inventory/ec2.py


echo $INPUT_CMD
eval $INPUT_CMD
