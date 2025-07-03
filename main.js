const { app, BrowserWindow }     = require('electron');
const { autoUpdater }            = require('electron-updater');
const path                       = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.ico')
  });
  win.loadFile('Freespins Logger.html');
}

app.whenReady().then(() => {
  createWindow();
  // prüft auf Updates und zeigt Notification an
  autoUpdater.checkForUpdatesAndNotify();
});

// (Optional) Events für Statusmeldungen
autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});