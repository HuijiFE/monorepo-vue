# monorepo-vue

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
