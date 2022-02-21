
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base'
  ],
  rules: {
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/lines-between-class-members': [ 'error', 'always', { "exceptAfterSingleLine": true } ],
    '@typescript-eslint/unbound-method': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': [ 'error', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 4 },
      'ObjectPattern': { 'multiline': true, 'minProperties': 4 },
      'ImportDeclaration': { 'minProperties': 2 }
    }],
    'operator-linebreak': [ 'error', 'after' ],
    'function-paren-newline': 'off',
    'nonblock-statement-body-position': [ 'error', 'below' ],
    'curly': ['error', 'multi-or-nest'],
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off'
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'padded-blocks': 'off'
      }
    }
  ]
};
