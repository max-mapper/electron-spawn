#!/usr/bin/env electron

var path = require('path')
var app = require('app')
var BrowserWindow = require('browser-window')
app.on('ready', function () {
  win = new BrowserWindow({show: false})
  win.loadURL('file://' + path.join(__dirname, 'index.html'))  
  win.webContents.on('did-finish-load', function() {
    win.webContents.send('args', process.argv)
  })
})

