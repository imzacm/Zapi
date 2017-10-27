'use strict'
const http = require('http')

/**
 * Represents an instance of an API or Server.
 * @class
 * @author Zac McChesney <imzacm@gmail.com>
 * @name Server
 * @param {object} config - Override the default config for this server.
 * @param {integer} config.port - The port to start the server on.
 * @param {object} config.defaultRoute - The default values for a route if these values are not specified.
 */
function Server (config) {
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

  Object.assign(this.config, config)

  this.routes = {
    GET: {},
    POST: {}
  }
  this.server = null

 /**
 * The default error handler.
 * @author Zac McChesney <imzacm@gmail.com>
 * @name errorHandler
 * @param {object} err - Error object.
 * @param {object} res - The response object to send an error to.
 * @memberOf Server
 */
  this.errorHandler = function (err, res) {
    res.end(JSON.stringify({
      error: err
    }))
  }

 /**
 * Adds a route to be used by the server.
 * @author Zac McChesney <imzacm@gmail.com>
 * @name addRoute
 * @param {object} r - A route object.
 * @param {string} r.path - The path for this route e.g. '/'.
 * @param {string} r.method - The method for this route e.g. 'GET', Must be in caps.
 * @param {function} r.handler - The handler for this route'.
 * @memberOf Server
 * @returns {Server} Current instance of Server.
 */
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

 /**
 * Removes a route from being used by the server.
 * @author Zac McChesney <imzacm@gmail.com>
 * @name removeRoute
 * @param {string} method - The method that contains the route e.g. 'GET'.
 * @param {string} path - The path to the route e.g. '/'.
 * @memberOf Server
 * @returns {Server} Current instance of Server.
 */
  this.removeRoute = function (method, path) {
    delete self.routes[method][path]
    return self
  }

 /**
 * Starts the server.
 * @author Zac McChesney <imzacm@gmail.com>
 * @name start
 * @memberOf Server
 * @returns {Server} Current instance of Server.
 */
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

 /**
 * Stops the server.
 * @author Zac McChesney <imzacm@gmail.com>
 * @name stop
 * @memberOf Server
 * @returns {Server} Current instance of Server.
 */
  this.stop = function () {
    self.server.close()
    return self
  }
}

module.exports = Server