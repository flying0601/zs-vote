// -----------------------------pages config----------------------------------
const fs = require('fs')
const merge = require('webpack-merge')
let pages = {}
const _configPages = async function () {
  await fs.readdirSync('./src/pages/').forEach(val => {
    pages[val] = {
      // page entry
      entry: `src/pages/${val}/index.js`,
      // 模板来源
      template: `src/pages/${val}/index.html`,
      // 在 dist/index.html 的输出
      filename: `${val}.html`
    }
  })
}
_configPages('./src/pages/') // readdirSync

// ---------------------------vue config------------------------------------
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const gzipSourceList = ['css', 'js']
const Timestamp = new Date().getTime()
module.exports = {
  publicPath: '/vote/',
  outputDir: './dist/vote/', // build path
  pages: pages, // more pages config
  productionSourceMap: true, // don·t use map
  devServer: {
    port: 1315, // port
    open: true, // default browser
    overlay: {
      warnings: true, // eslint show warnings
      errors: true // eslint show errors
    },
    proxy: {
      '/api': {
        // 测试环境
        // target: 'http://zsapi.i-active.cn',
        target: 'http://127.0.0.1:8390',
        changeOrigin: true // 是否跨域
      }
    }
  },
  configureWebpack: config => {
    // open gzip
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false
      return {
        plugins: [
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]', // 目标资源文件名称
            algorithm: 'gzip',
            test: new RegExp('\\.(' + gzipSourceList.join('|') + ')$'), // 匹配所有对应的文件
            threshold: 10240, // 多少kb 配置10kb
            minRatio: 0.8, // 压缩比例
            deleteOriginalAssets: false // 是否删除原始资源
          })
        ],
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
          filename: `js/[name].${Timestamp}.js`,
          chunkFilename: `js/[name].${Timestamp}.js`
        },
        externals: {
          jquery: '$'
        }
      }
    } else {
      return {
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
          filename: `js/[name].${Timestamp}.js`,
          chunkFilename: `js/[name].${Timestamp}.js`
        },
        externals: {
          jquery: '$'
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options =>
        merge(options, {
          limit: 5120
        })
      )
  }
}
