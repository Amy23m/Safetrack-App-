import React from "react";
import {CiLocationOn} from 'react-icons/ci';
import {IoNotificationsOutline} from 'react-icons/io5';
import {FiSettings, FiAlertTriangle} from 'react-icons/fi';
import { GoHistory } from "react-icons/go";

function Navigationbar({ activePage, setActivePage, notifications }) {
  const navItems = [
    { id: "map", label: "Map" },
    { id: "notifications", label: "Notifications" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div style={{
      width: '17%',
      backgroundColor: '#0f172b',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      border: "1px solid rgba(255, 255, 255, 0.15)", // 👈 subtle white divider
    }}>
      <h1 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        padding: '16px',
        borderBottom: '1px solid #374151'
      }}>
        SafeTrack
      </h1>
      <ul style={{ flex: 1, listStyleType: 'none', padding: '20px', margin: -10 }}>
        {navItems.map((item) => {
          const getIcon = () => {
            switch(item.id) {
                case "map":
                    return <CiLocationOn size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />;
                case "notifications":
                    return <IoNotificationsOutline size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />;
                case "settings":
                    return <FiSettings size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} />;
                default:
                    return null;
            }
          };

          const getBadge = () => {
            if (item.id === "notifications" && notifications.length == 0) {
              return (<span style={{
                backgroundColor: '#ef4444',
                borderRadius: '5px',
                color: 'white',
                padding: '2px 6px',
                fontSize: '12px',
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>{notifications.length}</span>);
            }
            return null;
          }

          return (
            <li
              key={item.id}
              style={{
                padding: '7px',
                cursor: 'pointer',
                backgroundColor: activePage === item.id ? '#145dfc' : 'transparent',
                transition: 'background-color 0.2s',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (activePage !== item.id) {
                  e.currentTarget.style.backgroundColor = '#1f2937';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = activePage === item.id ? '#145dfc' : 'transparent';
              }}
              onClick={() => setActivePage(item.id)}
            >
              {getIcon()}
              {item.label}
              {getBadge()}  
            </li>
          );
        })}
        </ul>
    </div>
  );
}

export default Navigationbar;
