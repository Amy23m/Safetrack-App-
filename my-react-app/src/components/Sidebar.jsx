import React from "react";

const Sidebar = ({ nodes }) => {
  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#0f172b",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Connected Nodes</h2>

      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {nodes.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No nodes loaded yet.</p>
        ) : (
          nodes.map((node) => {
            const status = (node.status || "").toLowerCase();
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
                  backgroundColor: "#1c293d",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "6px",
                  height: "70px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>{node.name}</div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#d1d5db",
                    }}
                  >
                    {node.status}
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
};

export default Sidebar;
