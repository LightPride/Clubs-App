module.exports = {
  env: {
    browser: true,
    jquery: true,
    es6: false,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['jquery'],
  rules: {
    'no-var': 'off',
    'prefer-const': 'off',
  },
};
