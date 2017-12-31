const http = require('http')
const mixin = require('merge-descriptors')
const methods = require('methods')
const Router = require('./router')

const slice = Array.prototype.slice

module.exports = function createServer() {
  const app = function (req, res) {
    //处理http请求
    app.handle(req, res)
  }
  //app inherit from proto
  mixin(app, proto, false)
  app.init()

  return app
}

const proto = Object.create(null)

/**
 * 
 * const http = require('http');
 * 
 * const server = http.createServer((req, res) => {
 *   res.end();
 * });
 * 
 * server.listen(3000);
 * 
 */
proto.listen = function (port) {
  const server = http.createServer(this)
  return server.listen.apply(server, arguments)
}

proto.init = function () {
  
}

proto.lazyrouter = function lazyrouter () {
  if (!this._router) {
    this._router = new Router({})
  }
}

proto.handle = function (req, res) {
  const router = this._router
  router.handle(req, res)
}

methods.forEach(function (method) {
  proto[method] = function (path) {
    this.lazyrouter()
    const route = this._router.route(path)
    route[method].apply(route, slice.call(arguments, 1))
    return this
  }
})