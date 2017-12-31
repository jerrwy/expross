const expross = require('../index.js')
const app = expross()

app.get('/foo', function (req, res, next) {
  res.end('Welcome to GET /foo')
})

app.get('/bar', function (req, res, next) {
  res.end('Welcome to GET /bar')
})

app.post('/foo', function (req, res, next) {
  res.end('Welcome to POST /foo')
})

app.listen(3000)