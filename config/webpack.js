const { resolve, join } = require('path')

const babel = require('./webpack.loaders.babel')
const css = require('./webpack.loaders.css')
const cssPlugins = require('./webpack.loaders.css.plugins')
const plugins = require('./webpack.plugins')
const prod = process.env.NODE_ENV === 'production'

var config = {
  context: process.cwd(),
  entry: [
    prod
      ? 'babel-polyfill'
      : 'webpack-hot-middleware/client?path=/__docs&overlay=true&reload=false',
    './src/index.js'
  ],
  output: {
    path: resolve(process.cwd(), 'docs/static'),
    filename: `js/docs.js`
  },
  resolve: {
    modules: [resolve(process.cwd(), '/src'), 'node_modules'],
    alias: {
      components: resolve(process.cwd(), 'src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      babel,
      css,
      cssPlugins,
      {
        test: /\.(jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: plugins(false)
}

if (!prod) {
  config.entry.unshift('babel-polyfill')
}

module.exports = config
