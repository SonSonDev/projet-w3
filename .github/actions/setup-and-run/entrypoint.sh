#!/bin/sh

echo $INPUT_VAULT_PASS > ~/vault_pass
ansible-vault decrypt .env.encrypted --output .env --vault-password-file=~/vault_pass

set -a && . ./.env && set +a


echo $SSH_PRIVATE_KEY > ~/id_rsa
chmod 600 ~/id_rsa
# ansible-galaxy install -r ./ansible/requirements.yml
# export ANSIBLE_HOST_KEY_CHECKING=False
# export ANSIBLE_CFG=./ansible.cfg
chmod 777 ./ansible/inventory/ec2.py


echo $INPUT_CMD
eval $INPUT_CMD

echo "::set-env name=DOCKER_USERNAME::$DOCKER_USERNAME"
echo "::set-env name=DOCKER_PASSWORD::$DOCKER_PASSWORD"