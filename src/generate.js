
const path = require('path')
const { readFileSync, existsSync } = require('fs')
const fse = require('fs-extra')
const chalk = require('chalk')
const nunjucks = require('nunjucks')

function transformFile(_path, _template, params, _filename) {
  const templatePath = path.resolve(__dirname, `../templates/${_template}.tpl`)
  if (existsSync(templatePath)) {
    const res = nunjucks.renderString(readFileSync(templatePath, 'utf-8'), params)
    const destFile = path.resolve(_path, `${_filename || _template}.js`)
    fse.outputFileSync(destFile, res, 'utf-8')

    console.log(`  ${destFile.replace(`${__dirname}/`, '')}`)
  } else {
    console.error(`Can't find template file of "${chalk.cyan(_template)}".`)
  }
}

module.exports = function generate(program) {
  const cwd = process.cwd()

  const [type, name] = program.args

  try {
    switch (type) {
      case 'menu':
      {
        console.log(`\nCreating arthur menu ${name} in ${cwd}\n`)
        transformFile(cwd, 'menu', { name })

        break
      }
      case 'module': {
        console.log(`\nCreating arthur module ${name} in ${cwd}\n`)

        transformFile(path.resolve(cwd, name), 'module', { name })
        transformFile(path.resolve(cwd, name), 'index', { className: name.replace(/( |^)[a-z]/g, s => s.toUpperCase()) })
        transformFile(path.resolve(cwd, name), 'menu', { name })
        transformFile(path.resolve(cwd, name), 'routes', { name })

        break
      }
      case 'submodule': {
        console.log(`\nCreating arthur submodule ${name} in ${cwd}\n`)
        const pathArr = cwd.split('/')
        const parentName = pathArr[pathArr.length - 1]
        transformFile(path.resolve(cwd, name), 'submodule', { name, parentName }, 'module')
        transformFile(path.resolve(cwd, name), 'subindex', { name, parentName, className: name.replace(/( |^)[a-z]/g, s => s.toUpperCase()) }, 'index')

        break
      }
      default:
        console.log(`Unknown type "${chalk.cyan(type)}".`)
        console.log('Perhaps you need to update @dx-groups/athena-cli?')
        break
    }
  } catch (e) {
    console.error(e.stack)
  }
}
