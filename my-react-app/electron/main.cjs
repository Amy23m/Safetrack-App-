const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { fork } = require('child_process');   // ⬅ needed to run auth server
const { initIPC } = require("./ipcHandlers.cjs");

let loginWindow;
let mainWindow;

// ----------------------
//  START LOCAL AUTH SERVER
// ----------------------
function startAuthServer() {
  const serverPath = path.join(__dirname, 'login-authentication', 'authServer.js');

  const child = fork(serverPath, {
    stdio: 'ignore', // prevents console spam in packaged exe
    detached: true
  });

  child.unref(); // let Electron exit independently

  console.log("Auth server started:", serverPath);
}

// ----------------------
//   LOGIN WINDOW
// ----------------------
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the login page from the auth server
  loginWindow.loadURL('http://localhost:3000/login');

  // Detect successful login
  loginWindow.webContents.on('will-redirect', (event, newUrl) => {
    if (newUrl.startsWith('http://localhost:3000/success')) {
      event.preventDefault();
      loginWindow.close();
      createMainWindow();
    }
  });
}

// ----------------------
//  YOUR ORIGINAL MAIN WINDOW
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
    mainWindow.loadFile(path.join(__dirname, '../my-react-app/build/index.html'));
  }

  initIPC(mainWindow); // keep your IPC EXACTLY the same
}


// ----------------------
//   APP STARTUP
// ----------------------
app.whenReady().then(() => {
  startAuthServer();            // ⬅ Start Passport authentication server
  setTimeout(createLoginWindow, 1000);  // ⬅ Wait a moment for server to fully boot
});


// ----------------------
//   EXIT HANDLING
// ----------------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
