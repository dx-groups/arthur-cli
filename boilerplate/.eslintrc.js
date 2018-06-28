module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    document: false,
    navigator: false,
    window: false,
  },
  // settings: {
  //   'import/core-modules': [ 'Utils', 'Assets', 'Global', 'Components', 'Modules' ]
  // },
  // http://eslint.org/docs/rules/xxx, xxx代表rule名称, 0=off, 1=warning, 2=error
  rules: {
    'import/no-unresolved': [2, {
      ignore: [ 'Utils', 'Assets', 'Global', 'Components', 'Modules' ]
    }],
    'import/prefer-default-export': [0],
    'comma-dangle': [2, 'always-multiline'],
    'func-names': [0],
    'no-plusplus': [2, { 'allowForLoopAfterthoughts': true }],
    'no-restricted-globals': [0],
    'no-underscore-dangle': [0],
    'no-param-reassign': [2, { 'props': false }],
    'no-unused-vars': [2, { 'args': 'none' }],
    'no-unused-expressions': [2, { 'allowShortCircuit': true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prop-types': [0],
    'react/forbid-prop-types': [0],
    'react/prefer-stateless-function': [0],
    'react/destructuring-assignment': [0],
    'react/jsx-wrap-multilines': [2, { 'prop': 'ignore' }],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-closing-bracket-location': [2, 'line-aligned'],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
  }
}
