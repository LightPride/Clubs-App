const { resolve } = require('node:path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.js',
    'postcss.config.js',
    'tailwind.config.js',
  ],
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './jsconfig.json',
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'unicorn/filename-case': 'off',
    'react/jsx-no-target-blank': 'off',
    'import/no-default-export': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'react/no-unstable-nested-components': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
