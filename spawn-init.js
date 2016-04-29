// redirect log to stdout
console.log = require('console').log
process.exit = require('remote').require('app').quit

// redirect errors to stderr
window.addEventListener('error', function (e) {
  e.preventDefault()
  require('console').error(e.error.stack || 'Uncaught ' + e.error)
})

var ipc = require('ipc')
var path = require('path')
ipc.on('args', function (args) {
  process.argv = args.slice(1)
  var app
  if (path.isAbsolute(args[2])) {
    app = require(args[2])
  } else {
    app = require(path.join(process.cwd(), args[2]))
  }
  if (typeof app === 'function') app(args.slice(2))
})
process.stdin._read = function (n) {
  ipc.send('stdin.read', n)
}
ipc.on('stdin.data', function (buf) {
  process.stdin.push(buf)
})
