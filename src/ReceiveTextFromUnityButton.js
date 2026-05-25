import React, { useState, useEffect } from "react";

const ReceiveTextFromUnity = ({ iframeWindow }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!iframeWindow) return;

      if (event.source !== iframeWindow) return;

      if (typeof event.data === "string") {
        setMessages((prev) => [
          { id: Date.now(), text: event.data },
          ...prev.slice(0, 19),
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [iframeWindow]);

  const clearMessages = () => setMessages([]);

  return (
    <div style={{ margin: "8px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          Messages from Unity
        </span>
        {messages.length > 0 && (
          <button onClick={clearMessages} style={{ fontSize: 12 }}>
            Clear
          </button>
        )}
      </div>

      <div
        style={{
          minHeight: 60,
          maxHeight: 160,
          overflowY: "auto",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "var(--border-radius-md)",
          padding: "8px 10px",
          fontSize: 13,
          color: "var(--color-text-secondary)",
        }}
      >
        {messages.length === 0 ? (
          <span>No messages received yet.</span>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ padding: "2px 0" }}>
              {msg.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceiveTextFromUnity;
