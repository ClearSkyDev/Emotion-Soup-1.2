// ESLint configuration for ESLint v9+
import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  js.config({
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 12,
      sourceType: 'module',
    },
  }),
  {
    plugins: { react },
    rules: {
      'react/prop-types': 'warn',
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
