const { join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs')

var endpoints = fs.readdirSync(join(process.cwd(), 'docs/endpoints'))

module.exports = admin => {
  var plugins = [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, '..', 'src', 'index.html'),
      showErrors: true
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      ENDPOINTS: JSON.stringify(endpoints)
    })
  ]

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          unused: true,
          dead_code: true
        },
        output: {
          comments: false
        }
      })
    )
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}
