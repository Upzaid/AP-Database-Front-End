const env = require('dotenv').config()
// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const electron = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");

if (require("electron-squirrel-startup")) {
  app.quit();
} 

const {OrdenPDF} = require('../src/PDF-Functions/OrdenPDF')
const {LiquidacionPDF} = require('../src/PDF-Functions/LiquidacionPDF')
const {AnticiposPDF} = require('../src/PDF-Functions/AnticiposPDF')

const url = isDev
? "http://localhost:3000"
: `file://${path.join(__dirname, "../build/index.html#")}`

function createWindow () {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 880,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname,'../src/Assets/Logo.png')
  })

  mainWindow.loadURL(url) // URL Accesspoint to the React App
  mainWindow.setMenu(null)
    
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Listen for create-window event
ipcMain.on('create-window', (event, arg) =>{
  const window = new BrowserWindow({
    width: arg.width,
    height: arg.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname,'../src/Assets/Logo.png')
  })
  window.setMenu(null)
  window.loadURL(`${url}${arg.url}`)

  event.returnValue = null
})

// Listen for confirm

ipcMain.on('confirm', (event, message)=>{
  const options ={
    type: 'none',
    buttons: ['Cancelar', 'Aceptar'],
    message,
    icon : path.join(__dirname,'../src/Assets/Logo.png')
  }
  const result = electron.dialog.showMessageBoxSync(options)
  if (result === 0) return event.returnValue = false
  return event.returnValue = true

} )

ipcMain.on('alert', (event, message) =>{
  const options ={
    type: "none",
    message,
    icon : path.join(__dirname,'../src/Assets/Logo.png')
  }

  electron.dialog.showMessageBoxSync(options)
  
  event.returnValue = null
})

ipcMain.on('print-orden', (event, orden)=>{
  OrdenPDF(orden)
  event.returnValue = null
})

ipcMain.on('print-liquidacion', (event, liquidacion)=>{
  LiquidacionPDF(liquidacion)
  event.returnValue = null
})

ipcMain.on('print-anticipos', (event, anticipos)=>{
  AnticiposPDF(anticipos)
  event.returnValue = null
})