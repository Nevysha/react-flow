import js from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parserTs from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooksWrap from './reactHooks.eslint.config.js';

const StrictConfig = {
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    jsdoc.configs['flat/recommended-typescript-error'],
    jsdoc.configs['flat/stylistic-typescript-error'],

    // Any other config imports go at the top
    eslintPluginPrettierRecommended
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: parserTs,
    parserOptions: {
      project: [
        'tsconfig.app.json',
        'tsconfig.node.json'
      ],
      sourceType: 'module',
      tsconfigRootDir: import.meta.dirname
    }
  },
  plugins: {
    'react-refresh': reactRefresh,
    '@stylistic/ts': stylisticTs,
    reactHooksWrap
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],

    /**
     * JSDoc rules
     */
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true
        }
      }
    ],
    'jsdoc/check-param-names': [
      'error',
      {
        checkRestProperty: true,
        checkDestructured: true
      }
    ],
    'jsdoc/check-line-alignment': ['error', 'always', {}],
    'jsdoc/require-param': [
      'error',
      {
        checkDestructuredRoots: false,
        contexts: ['any'],
        unnamedRootBase: ['arg']
      }
    ],
    'jsdoc/require-param-description': [
      'error',
      {
        contexts: ['any'],
        setDefaultDestructuredRootDescription: true,
        defaultDestructuredRootDescription: 'Destructured argument'
      }
    ],
    'jsdoc/tag-lines': [
      'error',
      'any',
      {
        startLines: 1
      }
    ],
    'jsdoc/lines-before-block': 'off'
  }
};

/**
 * TEMPORARY disabled rules
 */
const ConfigWithDisabled = {
  extends: [...tseslint.config(StrictConfig)],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    /**
     * JSDoc rules
     */
    'jsdoc/require-param-description': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-jsdoc': 'off'
  }
};

export default tseslint.config(ConfigWithDisabled);