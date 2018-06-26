#!/usr/bin/env node

// Be convenient for debugging with child process, to avoid use the same inspector port address
process.execArgv = process.execArgv.filter(a => a.includes('inspect-brk')).length > 0 ? ['--inspect-brk'] : []

const program = require('commander')

// Notify update when process exits
const updater = require('update-notifier')
const pkg = require('../package.json')

updater({ pkg }).notify({ defer: true })

program
  .version(pkg.version)
  .usage('<command> [options]')
  // .command('init', 'init a new application in current folder').alias('i')
  .command('new', 'create a new application').alias('n')
  .command('generate', 'create a new application')
  .alias('g')
  .parse(process.argv)


process.on('SIGINT', () => {
  program.runningCommand && program.runningCommand.kill('SIGKILL') // eslint-disable-line no-unused-expressions
  process.exit(0)
})
