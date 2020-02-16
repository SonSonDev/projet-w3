#!/bin/sh
yarn install --pure-lockfile
exec "$@"
