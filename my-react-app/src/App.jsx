import React, { useState, useEffect } from 'react';
import NotificationCenter from './Pages/NotificationCenter';
import MapPage from './Pages/MapPage';
import Navigationbar from "./components/Navigationbar";

const App = () => {

  // Node Data Receiving from Main Process

  const [nodes, setNodes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activePage, setActivePage] = useState("map"); // default page

  useEffect(() => {
    const handleNodeUpdate = (data) => {
      if (data && data.nodes) {
        setNodes(data.nodes);
      }
    };

    const handleNewNotification = (data) => {
      setNotifications((prev) => {
        // Keep the last 50 notifications for performance
        const newNotifications = [data ,...prev];
        return newNotifications.slice(-50);
      });
    }

    window.electronAPI?.onUpdateNodes(handleNodeUpdate);
    window.electronAPI?.onNewNotification(handleNewNotification);
  }, []);

  // Received nodes are passed to MapPage And NotificationCenter

  const renderPage = () => {
    switch (activePage) {
      case "map":
        return <MapPage nodes={nodes} />;
      case "notifications":
        return <NotificationCenter notifications={notifications} nodes={nodes} />;
      case "settings":
        //return <SettingsPage />;
      default:
        return <MapPage nodes={nodes} />;
    }
  };

  return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundColor: "#f3f4f6",
      margin: 0,
      padding: 0,
    }}
  >
    {/* Sidebar */}
    <Navigationbar activePage={activePage} setActivePage={setActivePage} notifications={notifications} />

    {/* Main Content */}
    <div
      style={{
        flex: 1,
        height: "100vh", // ensures full viewport height
        overflow: "hidden", // removes scroll
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      {renderPage()}
    </div>
  </div>
  );
};

export default App;
