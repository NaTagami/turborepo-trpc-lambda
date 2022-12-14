module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // 参考: https://qiita.com/pirosikick/items/0a7e85b3d347e77c0df1
    // テストファイルでのdevDependenciesのimportを許容
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.e2e-spec.ts'],
        optionalDependencies: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
  },
};
