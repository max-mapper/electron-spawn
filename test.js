if (process.versions['electron']) {
  module.exports = function (scripts) {
    console.log('test success: ' + scripts.join(','))
    require('electron').remote.app.quit()
  }
} else {
  var test = require('tape')
  var electronSpawn = require('./index.js')

  test('can spawn electron through an API', function (t) {
    t.plan(1)
    var electron = electronSpawn('test.js')
    electron.stdout.on('data', function (data) {
      data = data.toString()
      if (data.indexOf('test success') !== -1) {
        t.ok(data.indexOf('test success: test.js') !== -1, 'found the text we had our electron script output')
        t.end()
      }
    })
  })
}
