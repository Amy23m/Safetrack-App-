const { ipcMain, BrowserWindow, Notification } = require("electron");

// --- Dummy node data for testing ---
let nodes = [
  { id: 1, name: "Node A", battery: 15, latitude: 33.4205, longitude: -111.933, status: "active", lastUpdate: Date.now() },
  { id: 2, name: "Node B", battery: 20, latitude: 33.422, longitude: -111.929, status: "inactive", lastUpdate: Date.now() },
  { id: 3, name: "Node C", battery: 90, latitude: 33.418, longitude: -111.928, status: "active", lastUpdate: Date.now() },
];

// --- Helper function to send updates to frontend ---
function sendToRenderer(channel, data) {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    win.webContents.send(channel, data);
  }
}

// --- Simulate backend node updates every 10 seconds ---
function startBackendSimulation() {
  setInterval(() => {
    // Randomly change one node’s status to simulate activity
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    node.battery = Math.floor(Math.random() * 100);
    node.status = Math.random() > 0.7 ? "sos" : node.status === "active" ? "inactive" : "active";
    node.lastUpdate = Date.now();

    // Send node updates to frontend
    sendToRenderer("updateNodes", { nodes });


    // If SOS, trigger notification
    if (node.status === "sos") {
      const message = `${node.name} triggered an SOS alert!`;
      new Notification({ title: "⚠️ SOS Alert", body: message }).show();
      sendToRenderer("newNotification", {
        node: node,
        id: Date.now(),
        type: "SOS",
        message,
        timestamp: new Date().toISOString(),
      });
    } else if (node.status === "inactive") {
      const message = `${node.name} disconnected`;
      sendToRenderer("newNotification", {
        node: node,
        id: Date.now(),
        type: "System",
        message,
        timestamp: new Date().toISOString(),
      });
    } else if (node.status === "active" && node.battery < 15) {
      const message = `${node.name} has low battery (${node.battery}%)`;
      sendToRenderer("newNotification", {
        node: node,
        id: Date,
        type: "System",
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }, 10000); // every 10 seconds
}

// --- Listen for manual test messages from frontend (optional) ---
ipcMain.on("triggerTestNotification", (_, message) => {
  new Notification({ title: "Manual Test", body: message || "Test notification from frontend" }).show();
  sendToRenderer("newNotification", {
    id: Date.now(),
    type: "Manual",
    message,
    timestamp: new Date().toISOString(),
  });
});

// --- Export initialization function ---
function initIPC() {
  startBackendSimulation();
}

module.exports = { initIPC };
