# electron-spawn

run code easily inside of headless electron (chromium) windows from the command line

## usage

```
npm i electron -g
npm i electron-spawn -g
echo "console.log('hello')" | foo.js
electron-spawn foo.js
```

limitations:

- currently you have to globally install `electron`
- cannot automatically yet exit your program like how node does when you have no more activity on the event loop
- you will get weird stdout/stderr from electron. TODO figure out how to pass [logging disable flag](https://github.com/atom/electron/pull/1295)
