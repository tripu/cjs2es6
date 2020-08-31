#!/usr/bin/env node

const FS     = require('fs')
const globby = require('globby')
const path = require('path')

// const createStore = require('redux')
const r1     = /^(let|var|const)\s+(\S+)\s+\=\s+require\((\S+)\)/gm
// const createStore = require('redux').createStore
const r2     = /^(let|var|const)\s+(\S+)\s+\=\s+require\((\S+)\)\.(\w+)/gm
// const { createStore } = require('redux')
const r3     = /^(let|var|const)\s+\{([0-9a-zA-Z-,_\s]+)\}\s+\=\s+require\((\S+)\)/gm
// const logger = require('log4js').getLogger('controller.user')
const r4     = /^(let|var|const)\s+(\w+)\s+\=\s+require\((\S+)\)\.(\w+)\((\S+)*\)/gm
// exports.name =
const r5 = /^(module\.)*exports\.(\w+)\s*=\s*/gm
// module.exports = 
const r6 = /^module.exports(\.__proto__)*\s*=\s*/gm
// require('../')
const r7 = /^require\(([^\(]+)\)([\s;]*)$/gm
// __filename
const r8 = /^(.*require.*\b)__filename\b/m

const args = process.argv.slice(2)

if (!args.length) {
  console.error('Please pass a directory glob to "replace-require-with-import"\n')
  process.exit(1)
}

const ignores = ['node_modules']
const paths = globby.sync(args)

paths.forEach(function (p) {
  return replaceInFile(p)
})

function replaceInFile(fp) {
  if (ignores.includes(path.basename(fp))) {
    return
  }
  if (FS.statSync(fp).isDirectory()) {
    globby.sync(`${fp}/*`).forEach((p1) => {
      return replaceInFile(p1)
    })
  }
  if (!/^\.m*js$/.test(path.extname(fp))) {
    return
  }
  const result = FS.writeFileSync(fp, FS.readFileSync(fp, 'utf-8')
    .replace(r8, `import { fileURLToPath } from 'url';\nconst __filename = fileURLToPath(import.meta.url);\n$1__filename`)
    .replace(r6, `export default `)
    .replace(r5, `export const $2 = `)
    .replace(r4, `import _$2 from $3;\nconst $2 = _$2.$4($5)`)
    .replace(r3, `import {$2} from $3`)
    .replace(r2, `import { $4 as $2 } from $3`)
    .replace(r1, `import $2 from $3`)
    .replace(r7, `import $1$2`)
    , 'utf-8')
  console.log(`> ${fp}`)
  return result
}

console.info('Done!\n')
