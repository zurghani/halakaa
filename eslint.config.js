import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
// import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'build', 'node_modules'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      typescript,
      prettier,
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Prettier integration
      'prettier/prettier': 'warn',

      // TypeScript & React tweaks
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/jsx-key': "warn",

      // Optional: JSX formatting
      // 'react/jsx-closing-bracket-location': ['warn', 'after-props'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
)