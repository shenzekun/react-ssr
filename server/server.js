const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
// FIXME: 这个路径有问题
const serverEntry = require('../dist/server-entry').default

const isDev = process.env.NODE_ENV === 'development'

const app = express()

if (!isDev) {
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('服务开启')
})