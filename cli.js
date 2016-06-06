#!/usr/bin/env electron

var electron = require('electron')
var path = require('path')

electron.app.on('ready', function () {
  var win = new electron.BrowserWindow({show: false})
  win.loadURL('file://' + path.join(__dirname, 'index.html'))
  win.webContents.on('did-finish-load', function () {
    win.webContents.send('args', process.argv)
  })
  var reading = false
  electron.ipcMain.on('stdin.read', onread)
  process.stdin.on('readable', function () {
    if (reading) onread()
  })
  process.stdin.on('end', function () {
    win.webContents.send('stdin.data', null)
  })
  function onread () {
    var buf = process.stdin.read()
    reading = false
    if (buf) win.webContents.send('stdin.data', buf)
    else reading = true
  }
})

