"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // เลื่อนหน้าจอลงไปล่างสุดเมื่อมีข้อความใหม่
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // 1. เพิ่มข้อความของผู้ใช้เข้าไปในหน้าจอ
    const updatedMessages = [...messages, { role: "user", content: userMessage } as Message];
    setMessages(updatedMessages);

    try {
      // 2. ยิง API ไปที่หลังบ้านที่เราสร้างไว้
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }), // ส่งประวัติการคุยทั้งหมดไป
      });

      const data = await response.json();

      if (response.ok) {
        // 3. เอาคำตอบจาก Grok มาแสดงบนหน้าจอ
        setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
      } else {
        setMessages([...updatedMessages, { role: "assistant", content: "ขออภัยด้วยครับ ระบบขัดข้องเล็กน้อย ลองใหม่อีกครั้งนะ" }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-lg bg-white overflow-hidden my-10">
      {/* Header */}
      <div className="bg-amber-500 text-white p-4 font-bold text-lg flex items-center justify-between">
        <span>เที่ยวเชียงใหม่ AI Assistant (Powered by Grok)</span>
        <span className="text-xs bg-amber-600 px-2 py-1 rounded-full">Online</span>
      </div>

      {/* Messages Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg font-medium">สวัสดีครับ! ยินดีต้อนรับสู่เชียงใหม่ ⛰️</p>
            <p className="text-sm mt-2">ถามข้อมูลสินค้า OTOP หรือให้ผมช่วยจัดทริปในคูเมืองได้เลยนะ!</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-amber-500 text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"}`}>
              {/* ใช้ whitespace-pre-wrap เพื่อให้เวลา Grok เอนเทอร์ขึ้นบรรทัดใหม่ จัดทริปเป็นข้อๆ แล้วแสดงผลสวยงาม */}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 p-3 rounded-lg text-sm rounded-tl-none animate-pulse">
              กำลังค้นหาข้อมูลในระบบแป๊บหนึ่งนะ...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์คำถามของคุณที่นี่..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors disabled:bg-amber-300"
        >
          ส่ง
        </button>
      </form>
    </div>
  );
}