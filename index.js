'use strict';

const npmCliVersion = require('npm-cli-version');
const npmVersionCompare = require('npm-version-compare');

module.exports = async function rejectUnsatisfiedNpmVersion(...args) {
	if (await npmVersionCompare(...args) !== -1) {
		return;
	}

	const [requiredVersion] = args;
	const currentVersion = await npmCliVersion();

	const error = new Error(`Expected a version of npm CLI to be ${
		requiredVersion
	} or greater, but an older version ${
		currentVersion
	} is installed. Run the command \`npm install --global npm\` to install the latest one.`);

	error.code = 'ERR_TOO_OLD_NPM';
	error.currentVersion = currentVersion;
	error.requiredVersion = requiredVersion;

	throw error;
};
