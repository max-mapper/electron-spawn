# electron-spawn

run code easily inside of headless electron (chromium) windows from the command line

## usage

```
$ npm i electron-prebuilt -g
$ npm i electron-spawn -g
$ echo "console.log('hello')" > foo.js
$ electron-spawn foo.js
```

you can also export a function that takes arguments to get all the arguments passed in to your program:

```
$ echo "module.exports = function (args) { console.log(args) }" > foo.js
$ electron-spawn foo.js bar baz
# outputs ['bar', 'baz']
```

or you can use `process.argv` like an ordinary node program:

```
$ echo 'console.log(process.argv.slice(2))' > hello.js
$ electron-spawn hello.js beep boop
# outputs: ['beep', 'boop']
```

`process.stdin` works too:

``` js
process.stdin.on('data', function (buf) {
  console.log('buf=', buf)
})
```

```
$ echo beep boop | electron-spawn stdin.js
buf= <Buffer 62 65 65 70 20 62 6f 6f 70 0a>
```

## api

### `var spawn = require('electron-spawn')`

return a function that spawn electron

### `var electron = spawn(scriptname[, params..., execOptions])`

returns a child process running electron with the given `scriptname`

`params` are a list of arguments passed to the process

`execOptions` is an object literal to set options on how the process gets spawned

```js
var spawn = require('electron-spawn')
var electron = spawn('foo.js', 'bar', 'baz', {
  detached: true
})
electron.stderr.on('data', function (data) {
  console.error(data.toString())
})
electron.stdout.on('data', function (data) {
  console.log(data.toString())
})
```

limitations:

- cannot automatically yet exit your program like how node does when you have no more activity on the event loop  
  But in your script you can call `require('electron').remote.app.quit()` to quit when it's done:
```js
module.exports = function (args) {
  var img = new Image()
  img.onload = function () {
    require('electron').remote.app.quit()
  }
  img.src = 'http://example.com/cat.gif'
}
```

or you can call `process.exit()` like an ordinary node program.
