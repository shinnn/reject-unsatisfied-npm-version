'use strict';

const rejectUnsatisfiedNpmVersion = require('.');
const test = require('tape');

const MAX_VERSION = `${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}.${Number.MAX_SAFE_INTEGER}`;

test('rejectUnsatisfiedNpmVersion()', async t => {
	await rejectUnsatisfiedNpmVersion('6.1.0');
	t.pass('should be resolved when npm CLI satisfies the required verion.');

	try {
		await require('.')(MAX_VERSION);
	} catch ({code, message}) {
		t.ok(
			message.includes(`Expected a version of npm CLI to be ${MAX_VERSION} or greater, but an older version `),
			'should fail when npm CLI does\'t satisfy the required version.'
		);

		t.equal(
			code,
			'ERR_TOO_OLD_NPM',
			'should add `code` property to the error when npm CLI does\'t satisfy the required version.'
		);
	}

	try {
		await rejectUnsatisfiedNpmVersion();
	} catch (err) {
		t.equal(
			err.toString(),
			'RangeError: Expected 1 argument (<string>), but got no arguments.',
			'should fail when it takes no arguments.'
		);
	}

	try {
		await rejectUnsatisfiedNpmVersion('0.0.0', '1.1.1');
	} catch (err) {
		t.equal(
			err.toString(),
			'RangeError: Expected 1 argument (<string>), but got 2 arguments.',
			'should fail when it takes too many arguments.'
		);
	}

	t.end();
});
