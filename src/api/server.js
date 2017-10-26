'use strict'
const http = require('http')

module.exports = function () {
  let self = this
  this.config = {
    port: 3002,
    defaultRoute: {
      method: 'GET',
      path: '/',
      handler: (req, res) => {
        res.send('Default route')
      }
    }
  }
  this.routes = {
    GET: {},
    POST: {}
  }
  this.server = null
  this.errorHandler = function (err, res) {
    res.end(JSON.stringify({
      error: err
    }))
  }

  this.addRoute = function (r) {
    let routeToAdd = {},
      path = null,
      method = null
    Object.assign(routeToAdd, self.config.defaultRoute, r)
    path = routeToAdd.path
    method = routeToAdd.method
    self.routes[method][path] = routeToAdd.handler
    return self
  }

  this.removeRoute = function (method, path) {
    delete self.routes[method][path]
    return self
  }

  this.start = function () {
    self.server = http.createServer(function (req, res) {
      try {
        self.routes[req.method][req.url](req, res)
      }
      catch (e) {
        self.errorHandler(e, res)
      }
      return self
    })

    self.server.listen(self.config.port, function (err) {
      if (err) {
        console.error(err)
        return
      }
    })
  }
  this.stop = function () {
    self.server.close()
    return self
  }
}