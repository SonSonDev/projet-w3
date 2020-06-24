#!/bin/bash

echo $VAULT_PASS > ~/vault_pass
ansible-vault decrypt .env.encrypted --output .env --vault-password-file=~/vault_pass

set -a && . ./.env && set +a
for str in $(printenv)
do
  echo "::set-env name=${str%%=*}::${str#*=}"
  echo "::add-mask::${str%%=*}"
done
