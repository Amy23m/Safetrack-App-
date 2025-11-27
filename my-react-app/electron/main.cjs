const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initIPC } = require("./ipcHandlers.cjs");
const auth = require('./auth.cjs');

let loginWindow;
let mainWindow;

// ----------------------
//   LOGIN WINDOW (React-based)
// ----------------------
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    loginWindow.loadURL('http://localhost:5173/login');
  } else {
    const indexPath = path.join(__dirname, '../build/index.html');
    loginWindow.loadFile(indexPath, { hash: '/login' });
  }
}

// ----------------------
//  MAIN WINDOW
// ----------------------
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  initIPC(mainWindow);
}

// ----------------------
//  IPC AUTH HANDLERS
// ----------------------
ipcMain.handle('auth:login', async (event, { email, password }) => {
  try {
    const user = await auth.login(email, password);
    if (user) {
      if (loginWindow && !loginWindow.isDestroyed()) loginWindow.close();
      createMainWindow();
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  } catch (e) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('auth:register', async (event, { name, email, password }) => {
  try {
    const created = await auth.register({ name, email, password });
    if (created) return { success: true };
    return { success: false, message: 'Registration failed' };
  } catch (e) {
    return { success: false, message: e.message };
  }
});

ipcMain.handle('auth:logout', async () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
  createLoginWindow();
  return { success: true };
});

// ----------------------
//   APP STARTUP
// ----------------------
app.whenReady().then(() => {
  createLoginWindow();
});

// ----------------------
//   EXIT HANDLING
// ----------------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
