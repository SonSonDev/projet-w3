#!/bin/sh
yarn install
yarn deploy
exec "$@"
