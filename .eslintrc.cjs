module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
