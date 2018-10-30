const electron = require('electron')
const notifier = require('node-notifier')
const log = require('electron-log')
const app = electron.app // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const isDev = process.env.NODE_ENV !== 'production'

require('electron-context-menu')()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

function createWindow () {
  electron.app.setAppUserModelId('fr.keepass-cp.desktop')
  electron.ipcMain.on('notification', (event, { title, options }) => {
    if (typeof title === 'undefined') return
    notifier.notify({
      title: title,
      message: (options && options.body) || '',
      sound: true
    })
  })

  // Create the browser window
  mainWindow = new BrowserWindow({
    title: 'KeePass CP',
    // icon: pathResolve(__dirname, 'src/assets/img/passwords.ico'),
    width: 390,
    height: 500,
    backgroundColor: '#282C34',
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.setMenuBarVisibility(false)

  electron.ipcMain.on('progress', (event, progress) => mainWindow.setProgressBar(progress))

  if (isDev) {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.webContents.openDevTools()

    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS)
      .then(name => log.debug(`Added Extension:  ${name}`))
      .catch(err => log.error('An error occurred: ', err))
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('crashed', function () {
    log.error('WebContent crash !')
  })
  mainWindow.on('unresponsive', function () {
    log.error('Window unresponsive !')
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
process.on('uncaughtException', function () {
  log.error.apply(null, arguments)
})
