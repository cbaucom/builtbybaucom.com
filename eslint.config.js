import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sortKeysPlugin from 'eslint-plugin-sort-keys-fix';
import testingLibrary from 'eslint-plugin-testing-library';
import jest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['src/styles/theme.ts', 'src/styles/styled.d.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true
        }
      },
      globals: {
        $: true,
        document: true,
        mixpanel: true,
        process: true,
        window: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      jest,
      next: nextPlugin,
      prettier,
      react,
      'react-hooks': reactHooks,
      'sort-keys-fix': sortKeysPlugin,
      'testing-library': testingLibrary
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '_',
          ignoreRestSiblings: true,
          varsIgnorePattern: 'React'
        }
      ],
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'warn',
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-sort-props': 'error',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false
        }
      ],
      'sort-keys-fix/sort-keys-fix': [
        'warn',
        'asc',
        {
          caseSensitive: false
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['src/common/client/**', 'src/styles/**'],
    rules: {
      'sort-keys': 'off',
      'sort-keys-fix/sort-keys-fix': 'off'
    }
  }
];