"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to KICCPA! I'm your AI concierge. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      setIsTyping(false);
      let aiText = "Thank you for reaching out! A KAM International Group expert will review your request and contact you shortly. For immediate assistance, feel free to email info@kiccpa.com.";
      
      if (text.toLowerCase().includes("software")) {
        aiText = "Our custom software solutions are built for scalability. Would you like to schedule a discovery call to discuss your project requirements?";
      } else if (text.toLowerCase().includes("crm")) {
        aiText = "We specialize in agile CRM infrastructures tailored for enterprise growth. Should we have a consultant reach out to you?";
      } else if (text.toLowerCase().includes("ai")) {
        aiText = "AI is at the heart of everything we do. From predictive analytics to LLM pipelines, we can help you lead the market. What specific AI vertical are you interested in?";
      }

      setMessages(prev => [...prev, { role: "ai", text: aiText }]);
    }, 1500);
  };

  const quickPills = [
    "Custom Software",
    "CRM Solutions",
    "AI Innovation",
    "LMS Platforms"
  ];

  return (
    <div className={`chat-wrapper ${isOpen ? "chat-open" : ""}`}>
      {/* Trigger Button */}
      <button 
        className="chat-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        <span className="chat-icon">{isOpen ? "✕" : "✨"}</span>
        {!isOpen && <span className="chat-pulse"></span>}
      </button>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar-ring">
              <span className="chat-avatar">✨</span>
              <span className="online-dot"></span>
            </div>
            <div>
              <h3>KICCPA AI</h3>
              <p>Online · Ready to Help</p>
            </div>
          </div>
        </div>

        <div className="chat-messages" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === "user" ? "msg-user" : "msg-ai"}`}>
              <div className="msg-bubble">
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="msg-row msg-ai">
              <div className="msg-bubble typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>

        {messages.length < 3 && !isTyping && (
          <div className="chat-pills">
            {quickPills.map((p, i) => (
              <button key={i} className="chat-pill" onClick={() => handleSend(p)}>
                {p}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(input); }}>
          <input 
            type="text" 
            placeholder="Write a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chat-send-btn" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
