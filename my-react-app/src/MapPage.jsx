import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';

const MapPage = () => {
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

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar nodes={nodes} />
      <MapView nodes={nodes} />
    </div>
  );
};

export default MapPage;
