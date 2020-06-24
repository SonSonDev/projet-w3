#!/bin/bash

echo $VAULT_PASS > ~/vault_pass
ansible-vault decrypt .env.encrypted --output .env --vault-password-file=~/vault_pass

set -a && . ./.env && set +a
awk 'END { for (name in ENVIRON) {
  print "::set-env name="name"::"ENVIRON[name];
  print "::add-mask::"ENVIRON[name];
  }
}' < /dev/null