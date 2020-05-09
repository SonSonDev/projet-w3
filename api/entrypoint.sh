#!/bin/sh
yarn install --pure-lockfile
apk add --no-cache bash
./wait-for-it.sh prisma:4466 -- yarn deploy

yarn token
exec "$@"
