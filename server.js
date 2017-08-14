const compression = require('compression')
var bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./config/webpack')

app = express()
var port = 8080

const compiler = webpack(config)

app.use(compression())
app.use(bodyParser.json())

app.use([
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  })
])

app.use([
  webpackHotMiddleware(compiler, {
    path: '/__docs'
  })
])

app.use(express.static('../../assets'))

app.get('/*', (req, res, next) => {
  if (req.url.indexOf('hot-update.json') > -1) {
    return next()
  }

  if (req.url.indexOf('/api/') > -1) {
    return next()
  }

  const filename = path.join(siteCompiler.outputPath, 'index.html')
  siteCompiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(
        'Webpack building... try reloading the page once the initial build is done.'
      )
    }

    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(
      'Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port
    )
  }
})
