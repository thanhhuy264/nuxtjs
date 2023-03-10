module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  rules: {
    semi: ['error', 'never'],
    'prettier/prettier': [
      'error',
      { singleQuote: true, parse: 'flow', endOfLine: 'auto' },
    ],
    camelcase: 'off',
  },
}
