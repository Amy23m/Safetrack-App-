import NotificationCenter from './Pages/NotificationCenter';
import React, { useState, useEffect } from 'react';
import MapPage from './Pages/MapPage';

const App = () => {

  // Node Data Receiving from Main Process

  const [nodes, setNodes] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNodeUpdate = (data) => {
      if (data && data.nodes) {
        setNodes(data.nodes);
      }
    };

    const handleNewNotification = (data) => {
      setNotifications((prev) => {
        // Keep the last 50 notifications for performance
        const newNotifications = [...prev, data];
        return newNotifications.slice(-50);
      });
    }

    window.electronAPI?.onUpdateNodes(handleNodeUpdate);
    window.electronAPI?.onNewNotification(handleNewNotification);
  }, []);

  // Received nodes are passed to MapPage And NotificationCenter

  return <NotificationCenter nodes={nodes} notifications={notifications} />;
};

export default App;
