module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  extends: [
    'plugin:vue/vue3-recommended',

    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/no-unused-vars': 'error',
    // 去除 ts 函数要显式的放回
    '@typescript-eslint/explicit-function-return-type': 'off',
    //  开启隐式转换
    // https://typescript-eslint.io/rules/strict-boolean-expressions/
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
};
