import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { env: { jquery: true }, languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
