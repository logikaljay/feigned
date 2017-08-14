const ExtractTextPlugin = require('extract-text-webpack-plugin')
const prod = process.env.NODE_ENV === 'production'

var test = /\.(css|scss)$/
var use = [
  'style-loader',
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: 'css/[name]__[local]___[hash:base64:6]',
      minimize: false
    },
  },
  'sass-loader'
]

var loader = {
  test,
  use,
  include: /src/
}

if (prod) {
  use.shift()
  loader = {
    test,
    use: ExtractTextPlugin.extract({
      allChunks: true,
      fallback: 'style-loader',
      use
    })
  }
}

module.exports = loader