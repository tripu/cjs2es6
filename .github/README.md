![Logo](https://repository-images.githubusercontent.com/511783578/1f964778-5079-47f5-a1dd-13c62f66dc49)

_Automatic migration of modules:_ CommonJS → ES6

Copyright © 2016–2022 James J. Womack, Ole Morten Didriksen, luoage, tripu.
See [the licence](../LICENSE.txt).

[![npm version](https://img.shields.io/npm/v/cjs2es6.svg)](https://npmjs.org/package/cjs2es6)
[![Licence](https://img.shields.io/npm/l/cjs2es6.svg)](https://github.com/tripu/cjs2es6/blob/master/LICENSE.txt)

## Prerequisites

* [Node.js](https://nodejs.org/) `14`, `16` (preferred) or `18`
* npm `7` or `8` (preferrred)

## Usage

Two ways:

### Installing first

```bash
npm i -g cjs2es6
cjs2es6 [GLOB]...
```

### Without installation

```bash
npx cjs2es6 [GLOB]...
```

### Examples

```bash
cjs2es6 src/
cjs2es6 lib/**/*.js
cjs2es6 ./index.js ./modules/*.mjs ../react-client/**/*.ts*
```

## Development

```bash
git clone https://github.com/tripu/cjs2es6.git
cd cjs2es6
npm ci
```

See [the _changelog_](../CHANGELOG.md)

## Testing

```bash
npm t
```
