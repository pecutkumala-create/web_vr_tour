import React, { useState } from "react";

const SpawnObjectButton = ({ iframeWindow }) => {
  const [objectName, setObjectName] = useState("Cube");

  const handleSpawn = () => {
    if (!iframeWindow) {
      console.warn("Unity iframe is not loaded yet.");
      return;
    }

    try {
      iframeWindow.SendMessage("GameManager", "SpawnObject", objectName);
    } catch (error) {
      console.error("Failed to spawn object in Unity:", error);
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
      <input
        type="text"
        value={objectName}
        onChange={(e) => setObjectName(e.target.value)}
        placeholder="Object name (e.g. Cube)"
        style={{ flex: 1 }}
        disabled={!iframeWindow}
      />
      <button onClick={handleSpawn} disabled={!iframeWindow || objectName.trim() === ""}>
        Spawn object
      </button>
    </div>
  );
};

export default SpawnObjectButton;
