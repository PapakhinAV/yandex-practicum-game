module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'semi': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'operator-linebreak': ['error', 'before'],
    'quotes': ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'brace-style': ['error', '1tbs']
  },
}
