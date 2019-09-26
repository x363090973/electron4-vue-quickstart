# electron-version4

> 这是一个基于 vue-cli3 的 electron4 并集成 ffi 模块的最简版本

## ffi 模块的安装，需要先安装环境依赖

> ffi 模块的安装经常受 node 以及 electron 的版本影响，此处我用的是（node 10.16.0 32 位,eletrcon 4.0.0,ffi 2.3.0）

### windows 下

```
1. npm install --global --production windows-build-tools
2. npm install node-gyp --g (全局安装)
3. npm run install
4. ./node_modules/.bin/electron-rebuild ./node_modules/ffi  (此处提示编译成功，环境就部署好了)
```

## Project setup

```
npm run install 尽量不要使用yarn，yarn可能不会触发electron-rebuild
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```
