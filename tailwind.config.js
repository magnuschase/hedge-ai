module.exports = {
  content: [
		'./**/*.(ts|tsx',
		'./App.tsx',
		'./src/screens/*.tsx',
		'./src/**/*.(ts|tsx)',
		'./*.tsx'
	],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
