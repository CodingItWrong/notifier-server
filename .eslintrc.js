module.exports = {
  plugins: ['prettier', 'import'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  globals: {
    Promise: true,
  },
  rules: {
    'import/newline-after-import': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-mutable-exports': 'error',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'no-duplicate-imports': 'error',
    'prettier/prettier': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
