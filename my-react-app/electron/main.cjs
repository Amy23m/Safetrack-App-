const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { initIPC } = require("./ipcHandlers.cjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../my-react-app/build/index.html'));
  }

  return win;
}

app.whenReady().then(() => {
  const win = createWindow();
  initIPC(win); // ✅ initialize IPC logic here
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
