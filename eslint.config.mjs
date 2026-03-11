import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplate from '@angular-eslint/eslint-plugin-template';

export default [
  { ignores: ['node_modules/', '.angular/', 'dist/'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        fetch: true,
        console: true,
        localStorage: true,
        crypto: true,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './cypress/tsconfig.json'],
      },
    },
    linterOptions: {
      noInlineConfig: true,
    },
    plugins: {
      '@angular-eslint': angular,
      '@angular-eslint/template': angularTemplate,
      prettier: prettierPlugin,
      unicorn: eslintPluginUnicorn,
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      'max-len': ['error', 180],
      '@typescript-eslint/no-magic-numbers': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      'no-magic-strings': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', 'setup-jest.ts', 'jest.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.spec.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['e2e/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: undefined,
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      '@angular-eslint/template/elements-content': 'off',
    },
  },
];
