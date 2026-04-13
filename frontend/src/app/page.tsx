"use client";

import { useState } from "react";
import LavenderHome from "@/frontend/lavender-home/LavenderHome";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <LavenderHome onOpenVideo={() => setShowVideo(true)} />

      {showVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setShowVideo(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(9, 11, 26, 0.96)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            padding: "20px",
          }}
        >
          <div
            className="video-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "var(--OR)",
                border: "none",
                color: "#fff",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "1.4rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(255,130,63,0.4)",
              }}
            >
              ✕
            </button>
            <video
              controls
              autoPlay
              style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
              src="/images/Demo.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
}
