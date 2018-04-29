const axios = require('axios')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const getTemplete = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.error(err)
  })
  stats.warnings.forEach(warning => {
    console.warn(warning)
  })
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 一定要加上名字
  serverBundle = m.exports.default
})

module.exports = function (app) {
  app.use(
    '/pubilc',
    proxy({
      target: 'http://localhost:8888'
    })
  )
  app.get('*', function (req, res) {
    getTemplete().then(templete => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(templete.replace('<!-- app -->', content))
    })
  })
}
