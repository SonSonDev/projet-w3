#!/bin/sh
yarn install --pure-lockfile
yarn deploy
yarn token
exec "$@"
