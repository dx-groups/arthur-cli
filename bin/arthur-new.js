#!/usr/bin/env node

const program = require('commander')
const init = require('../lib/init')

program
  .usage('[options] <templateName>')
  .parse(process.argv)

init(program)
