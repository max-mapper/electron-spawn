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

## api

### `var spawn = require('electron-spawn')`

return a function that spawn electron

### `var electron = spawn(scriptname[, params..., execOptions])`

returns a child process running electron with the given `scriptname`

`params` are a list of arguments passed to the process

`execOptions` is an object literal to set options on how the process gets spawned

```js
var electronSpawn = require('electron-spawn')
var electron = electronSpawn('foo.js', 'bar', 'baz', {
  detached: true
})
electron.stderr.on('data', function (data) {
  console.log(data.toString())
})
```

limitations:

- currently you have to globally install `electron`
- cannot automatically yet exit your program like how node does when you have no more activity on the event loop
- you will get weird stdout/stderr from electron. TODO figure out how to pass [logging disable flag](https://github.com/atom/electron/pull/1295)
