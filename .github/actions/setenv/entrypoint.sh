#!/bin/sh

echo $VAULT_PASS > ~/vault_pass
ansible-vault decrypt .env.encrypted --output .env --vault-password-file=~/vault_pass

for var in $(cat .env) 
do 
  echo "::set-env name=$(echo $var | sed 's/=/::/')"
done

# set -a && . ./.env && set +a


# echo $SSH_PRIVATE_KEY > ~/id_rsa
# chmod 600 ~/id_rsa

# cd ./automation/ansible
# ansible-galaxy install -r requirements.yml
# chmod 777 inventory/ec2.py

# ansible-playbook get_elb_dns.yml -i inventory/hosts
# echo "::set-env name=REACT_APP_API_URL::$(cat elb_api_dns.txt)"


# echo $INPUT_CMD
# eval $INPUT_CMD
