module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		indent: ['error', 'tab'],
		'no-multi-spaces': ['error'],
		'no-tabs': 0,
		'linebreak-style': 0,
		'no-shadow': 0,
		camelcase: 2,
		'import/prefer-default-export': 'off',
		'import/no-named-as-default-member': 'off',
		'import/extensions': 'off',
		'consistent-return': 0,
		radix: 'off',
		'no-prototype-builtins': 'off',
	},
};
