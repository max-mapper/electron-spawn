#!/usr/bin/env electron

var path = require('path')
var app = require('app')
var BrowserWindow = require('browser-window')
var ipc = require('electron').ipcMain

var getStartingHtmlFilePath = (filename) => {
    if (filename) {
        return `../../${filename}`;
    }

    return 'index.html';
};

var startingHtmlFilePath = getStartingHtmlFilePath(process.argv[3]);

app.on('ready', function () {
  win = new BrowserWindow({show: false})
  win.loadURL('file://' + path.join(__dirname, `${startingHtmlFilePath}`))
  win.webContents.on('did-finish-load', function() {
    win.webContents.send('args', process.argv)
  })
  var reading = false
  ipc.on('stdin.read', onread)
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
