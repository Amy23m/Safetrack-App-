import NotificationCenter from './Pages/NotificationCenter';
import React, { useState, useEffect } from 'react';
import MapPage from './Pages/MapPage';

const App = () => {

  // Node Data Receiving from Main Process

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const handleNodeUpdate = (_, data) => {
      if (data && data.nodes) {
        setNodes(data.nodes);
      }
    };

    window.electron?.ipcRenderer?.on("updateNodes", handleNodeUpdate);

    return () => {
      window.electron?.ipcRenderer?.removeListener("updateNodes", handleNodeUpdate);
    };
  }, []);

  // Received nodes are passed to MapPage And NotificationCenter

  return <NotificationCenter nodes={nodes} />;
};

export default App;
