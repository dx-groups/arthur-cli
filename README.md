# arthur-cli

The [arthur](https://github.com/elephant-fe/athena) command line utility.

## Getting Started

```bash
# install
$ npm i -g @dx-groups/arthur-cli

# create a new Arthur app
$ arthur new <app-name>

# start
$ cd <app-name>
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

## Commands

### `new` (alias: `n`)

> arthur new <app-name>

### `generate` (alias: `g`)

> arthur generate [options]

Generate `module`, `submodule` and `menu`

```bash
$ arthur g module <module-name>
$ arthur g submodule <submodule-name>
$ arthur g menu <menu-name>
```
