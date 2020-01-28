module.exports = {
  "parser": "babel-eslint",
  'env': {
    "node": true,
    'browser': true,
    'es2020': true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      2,
      'never'
    ],
  }
}
