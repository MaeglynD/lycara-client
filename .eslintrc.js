module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
  },

  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],

  plugins: [
  ],

  // add your custom rules here
  rules: {
    indent: [
      'error',
      2,
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  settings: {
    'import/core-modules': [
      'vuetify',
      'vuetify/es5/util/colors',
    ],
    'import/resolver': {
      alias: {
        map: [
          ['@', '.'],
        ],
        extensions: ['.vue', '.js'],
      },
    },
  },

  overrides: [
    {
      files: [
        '**/*.spec.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
