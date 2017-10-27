'use strict'
const Zapi = require('../src/server'),
  api = new Zapi({
    port: 3001
  })

api.addMiddleware((req, res, next) => {
  console.dir(req)
  next()
})

api.addRoute({
  path: '/',
  method: 'GET',
  handler: (req, res) => {
    res.end('Hi')
  }
})

api.addRoute({
  path: '/',
  method: 'POST',
  handler: (req, res) => {
    res.end(req)
  }
})

api.start()