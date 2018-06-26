#!/usr/bin/env node

const program = require('commander')
const generate = require('../lib/generate')

program
  .usage('[options] <templateName>')
  .parse(process.argv)

generate(program)
