const http = require('http')
const mixin = require('merge-descriptors')
const methods = require('methods')
const Layer = require('./router/layer.js')

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
  this.handles = []
}

proto.handle = function (req, res) {
  
  // 对handles中的函数进行遍历
  this.handles.forEach((handle) => handle.handle_request(req, res))
}

methods.forEach(function(method) {
  proto[method] = function(fn) {
    //对于每个method都有一个fn进行处理
    const layer = new Layer(method, fn)
    this.handles.push(layer)
  }
})