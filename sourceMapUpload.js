const upload = require('bugsnag-sourcemaps').upload
const glob = require('glob')
const appVersion = require('./package.json').version
const bugsnagKey = require('./src/configs/env.json').BUGSNAG_KEY
const path = require('path')

glob('source-maps/*.js.map', (err, files) => {
	if (err) throw err
	Promise.all(files.map(processMap))
})

const processMap = (sourceMap) => {
	// console.log(sourceMap);
	const minifiedFileName = sourceMap.split('/')[1].split('.map')[0]
	return upload({
		apiKey: bugsnagKey,
		appVersion: appVersion,
		minifiedUrl: `*/static/js/${minifiedFileName}`,
		sourceMap: path.resolve(__dirname, sourceMap),
		minifiedFile: `${__dirname}/build/static/js/${minifiedFileName}`,
		projectRoot: __dirname,
		uploadSources: true,
		overwrite: true,
	})
	// console.log(minifiedFileName, sourceMap);
}
