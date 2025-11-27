// electron/preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

// Expose safe APIs to the renderer (frontend)
contextBridge.exposeInMainWorld("electronAPI", {
  // ---- Send messages to main process ----
  triggerTestNotification: (message) =>
    ipcRenderer.send("triggerTestNotification", message),

  // ---- Listen for updates from backend ----
  onUpdateNodes: (callback) => {
    ipcRenderer.removeAllListeners("updateNodes");
    return ipcRenderer.on("updateNodes", (_, data) => callback(data));
  },

  onNewNotification: (callback) => {
    ipcRenderer.removeAllListeners("newNotification");
    return ipcRenderer.on("newNotification", (_, data) => callback(data));
  },

  // ---- Authentication API (IPC invoke) ----
  login: async (credentials) => {
    return await ipcRenderer.invoke('auth:login', credentials);
  },

  register: async (credentials) => {
    return await ipcRenderer.invoke('auth:register', credentials);
  },

  logout: async () => {
    return await ipcRenderer.invoke('auth:logout');
  }
});
