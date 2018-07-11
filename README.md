# reject-unsatisfied-npm-version

[![npm version](https://img.shields.io/npm/v/reject-unsatisfied-npm-version.svg)](https://www.npmjs.com/package/reject-unsatisfied-npm-version)
[![Build Status](https://travis-ci.com/shinnn/reject-unsatisfied-npm-version.svg?branch=master)](https://travis-ci.com/shinnn/reject-unsatisfied-npm-version)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/reject-unsatisfied-npm-version.svg)](https://coveralls.io/github/shinnn/reject-unsatisfied-npm-version)

[Make a `Promise` rejection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) unless the currently installed [npm CLI](https://github.com/npm/npm) satisfies the required version

```javascript
const rejectUnsatisfiedNpmVersion = require('reject-unsatisfied-npm-version');

// When `npm --version` prints `6.1.0`

(async () => {
  await rejectUnsatisfiedNpmVersion('6.0.0'); // not rejected
  await rejectUnsatisfiedNpmVersion('6.1.0'); // not rejected

  try {
    await rejectUnsatisfiedNpmVersion('6.2.0');
  } catch (err) {
    err.message; //=> 'Expected a version of npm CLI to be 6.2.0 or greater, but an older version 6.1.0 is installed. Run the command `npm install --global npm` to install the latest one.'
    err.code; //=> 'ERR_TOO_OLD_NPM'
  }
})();
```

Useful for applications and libraries which requires a newer version of `npm`.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install reject-unsatisfied-npm-version
```

## API

```javascript
const rejectUnsatisfiedNpmVersion = require('reject-unsatisfied-npm-version');
```

### rejectUnsatisfiedNpmVersion(*requiredNpmVersion*)

*requiredNpmVersion*: `string` (minimum required `npm` version as a [SemVer](https://semver.org/#semantic-versioning-specification-semver) expression)  
Return: `Promise`

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
