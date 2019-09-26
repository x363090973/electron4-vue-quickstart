'use strict'
const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
        'src': resolve('src')
      }
    },
    //vue调试模式
    devtool: 'source-map'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        // Detail: https://www.electron.build/configuration/configuration
        "appId": "com.example.aDemo",
        "productName": "aDemo", //项目名，也是生成的安装文件名，即aDemo.exe
        // "publish": [{
        //   "provider": "github",
        //   owner: 'x363090973', // 拥有者
        //   token: 'ec48a133b0a2a61e4daee6cb0d50f4a1c4349329', // gitToken
        //   releaseType: 'release',
        //   publishAutoUpdate: true // 发布自动更新（需要配置GH_TOKEN）。 默认true
        // }],
        "publish": [{
          "provider": "generic",
          "url": "http://106.15.234.206:1234/assets/electron-quick-start"
        }],
        "win": { //win相关配置
          //"icon": "./shanqis.ico", //图标，当前图标在根目录下，注意这里有两个坑
          "target": [{
            "target": "nsis", //利用nsis制作安装程序
            "arch": [
              "ia32" //32位
            ]
          }]
        }
      }
    }
  },


}
