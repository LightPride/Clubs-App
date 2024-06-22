module.exports = {
  env: {
    browser: true,
    jquery: true,
    es6: true,
  },
  extends: [require.resolve('@vercel/style-guide/eslint/browser')],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['jquery'],
  rules: {
    'unicorn/filename-case': 'off',
  },
};
