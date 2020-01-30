#!/bin/sh
yarn install
yarn deploy
yarn token
exec "$@"
