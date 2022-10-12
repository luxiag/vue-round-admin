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
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: [],
      },
    ],

    // '@typescript-eslint/ban-ts-ignore': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // 'vue/custom-event-name-casing': 'off',
    // 'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    // '@typescript-eslint/ban-types': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
  },
};
