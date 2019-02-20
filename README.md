# Mono repository for Vue.js

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Framework

```
packages/@ns
├── common
│   ├── dist
│   ├── public
│   ├── scripts
│   ├── src
│   │   ├── components
│   │   └── font-awesome
│   ├── tests
│   │   └── unit
│   └── typings
└── web
    ├── dist
    ├── node_modules
    ├── public
    ├── scripts
    ├── src
    │   ├── components
    │   │   └── example
    │   └── views
    └── typings
```

## Development

### Boostrap

> **NOTE**: Please disable git core.autocrlf before clone. `git config --global core.autocrlf false`

```bash
# clone the repo
git clone git@github.com:duduluu/monorepo-vue.git
cd monorepo-vue

# install dependencies
yarn install
```

### Develop sub-project @ns/web

```bash
# start the hot-reload dev-server
cd packages/@ns/web
yarn serve
```
