
const path = require('path')
const vfs = require('vinyl-fs')
const through2 = require('through2')
const chalk = require('chalk')

module.exports = function init(program) {
  const [name] = program.args

  const sourceDir = path.resolve(__dirname, '../boilerplate')
  const destDir = path.resolve(process.cwd(), name)

  console.log(`\nCreating a new Arthur app in ${destDir}\n`)

  vfs.src(['**/*', '!node_modules/**/*'], { cwd: sourceDir, cwdbase: true, dot: true })
    .pipe(through2.obj(function (file, enc, cb) { // eslint-disable-line func-names
      if (!file.stat.isFile()) {
        return cb()
      }

      console.log(`  ${file.path.replace(`${sourceDir}/`, '')}`)
      this.push(file)
      cb()
    }))
    .pipe(vfs.dest(destDir))
    .on('end', () => {
      console.error(chalk.green(`
Created ${name} at ${destDir}

Inside that directory, you can run several commands:

  * npm install: Install dependencies
  * npm start: Starts the development server
  * npm run build: Bundles the app into build for production

      `))
    })
}
