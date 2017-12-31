const http = require('http')
const mixin = require('merge-descriptors')
const methods = require('methods')
const Route = require('./router/route')
// const Layer = require('./router/layer')

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
  // this.handles = []
  this.route = new Route()
}

proto.handle = function (req, res) {
  this.route.dispatch.apply(this.route, slice.call(arguments))
}

methods.forEach(function(method) {
  proto[method] = function (fn) {
    //slice.call(arguments)把传参转化为数组
    this.route[method].apply(this.route, slice.call(arguments))
  }
})