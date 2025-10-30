import react from 'react';

const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
};

const NotificationCenter = ({ nodes }) => {
  return (
    <div style={{
        backgroundColor: "#020618",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "left"
    }}>
        <h2>Notification Center</h2>
        <p>This is where notifications will be displayed.</p>

        <div style={{ flexGrow: 1, overflowY: "auto" }}>
        { nodes.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No Notifications</p>
        ) : (
          nodes.map((node) => {
            const status = (node.status || "").toLowerCase();
            let message;
            const icon = (node) => {
              if (status === "sos") {
                message = node.name + " SOS Alert!";
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="custom-svg size-6"
                    style={{
                        width: '60%',
                        height: '60%',
                        stroke: '#e55e62', 
                        fill: 'none',
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                );
              } else if (status === "active") {
                message = node.name + " Active";
                return (
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="size-6"
                  style={{
                        width: '60%',
                        height: '60%',
                        stroke: '#58abff', 
                        fill: 'none',
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>

                );
              } else if (status === "inactive") {
                message = node.name + " Disconnected";
                return (
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"   
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-6"
                    style={{
                        width: '60%',
                        height: '60%',
                        stroke: '#8e9db6', 
                        fill: 'none',
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 0 1 0 5.304m2.121-7.425a6.75 6.75 0 0 1 0 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 0 1-1.06-2.122m-1.061 4.243a6.75 6.75 0 0 1-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12Z" />
                  </svg>

                );
              } else if (node.battery < 15) {
                message = node.name + " Low Battery (<15%)";
                return (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    // We'll set the default stroke to a light grey for the outer casing.
                    // The inner path will override this with its own 'stroke'.
                    stroke="#9CA3AF" // Light grey for the outer casing
                    className="size-6" 
                  >
                    {/* Outer Battery Casing Path */}
                    {/* This path draws the main body and the small positive terminal */}
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" 
                    />

                    {/* Inner Battery Charge Indicator Path */}
                    {/* This path draws the filled-in rectangle. We set its stroke to red. */}
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.5 10.5h6.75V15H4.5v-4.5Z" 
                      stroke="red" // Explicitly set this path's stroke to red
                      fill="red"   // Also fill it red for a solid appearance
                    />
                  </svg>
                );
              }
            }
            const getColor = (s) => {
              if (s === "sos") return "#ef4444"; // red
              if (s === "active") return "#22c55e"; // green
              return "#9ca3af"; // gray
            };

            return (
              <div
                key={node.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#0f172b",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "6px",
                  height: "70px",
                }}
              >
                <div 
                  style={{ 
                    display: "flex",  
                    alignItems: "center" 
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1c293d', 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '15px', // Increased margin to separate icon and text
                    }}
                  >
                    {icon( node )}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{message}</div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#d1d5db",
                      }}
                    >
                      {node.lastUpdate && `${getTimeAgo(node.lastUpdate)}`}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: getColor(status),
                  }}
                ></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotificationCenter;