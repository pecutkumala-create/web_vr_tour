import React, { useState } from "react";

const SentTextToUnityButton = ({ iframeWindow }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!iframeWindow) {
      console.warn("Unity iframe is not loaded yet.");
      return;
    }

    try {
      iframeWindow.SendMessage("GameManager", "ReceiveText", text);
      setText("");
    } catch (error) {
      console.error("Failed to send message to Unity:", error);
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message for Unity..."
        style={{ flex: 1 }}
        disabled={!iframeWindow}
      />
      <button onClick={handleSend} disabled={!iframeWindow || text.trim() === ""}>
        Send to Unity
      </button>
    </div>
  );
};

export default SentTextToUnityButton;
