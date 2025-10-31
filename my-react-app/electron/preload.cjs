// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

// Expose safe APIs to the renderer (frontend)
contextBridge.exposeInMainWorld("electronAPI", {
  // ---- Send messages to main process ----
  triggerTestNotification: (message) =>
    ipcRenderer.send("triggerTestNotification", message),

  // ---- Listen for updates from backend ----
  onUpdateNodes: (callback) => {
    // Remove any existing listeners before adding new one
    ipcRenderer.removeAllListeners("updateNodes");
    return ipcRenderer.on("updateNodes", (_, data) => callback(data));
  },

  onNewNotification: (callback) => {
    // Remove any existing listeners before adding new one
    ipcRenderer.removeAllListeners("newNotification");
    return ipcRenderer.on("newNotification", (_, data) => callback(data));
  },
});
