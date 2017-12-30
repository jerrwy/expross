'use strict'
const hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = Layer

function Layer(method, fn) {
  this.method = method,
  this.handle = fn
}

Layer.prototype.handle_method = function (req) {
  return this.method.toLowerCase() === req.method.toLowerCase()
}

//如果请求的method与handle的method相等,则处理请求
Layer.prototype.handle_request = function(req, res) {
  if (!this.handle_method(req)) return
  const fn = this.handle
  try {
    fn(req, res)
  } catch (err) {
    throw err
  }
}