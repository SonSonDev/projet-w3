#!/bin/sh
npm install
npm rebuild node-sass
exec "$@"
