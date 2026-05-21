"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  source?: "internal" | "external";
}

// Simple markdown-to-JSX: bold, links, line breaks
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Parse inline: **bold** and [text](url)
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\)]+)\))/g;
    let last = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      if (match[0].startsWith("**")) {
        parts.push(<strong key={match.index}>{match[2]}</strong>);
      } else {
        parts.push(
          <a
            key={match.index}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {match[3]}
          </a>
        );
      }
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));

    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "ไม่มีคำตอบ",
          source: data.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h1 className="text-xl font-bold">🧭 AI ผู้ช่วยท่องเที่ยวเชียงใหม่</h1>
        <p className="text-sm text-gray-500">ถามได้ทุกเรื่อง โรงแรม ร้านอาหาร สถานที่ท่องเที่ยว</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-4xl mb-3">🏔️</p>
            <p>เริ่มต้นด้วยการถามเกี่ยวกับเชียงใหม่เลย!</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-black text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm border rounded-bl-sm"
              }`}
            >
              {msg.role === "assistant" && msg.source && (
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-medium ${
                    msg.source === "internal"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {msg.source === "internal" ? "✅ ข้อมูลจากเว็บเรา" : "🌐 ข้อมูลจากอินเทอร์เน็ต"}
                </span>
              )}
              <div>{msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1 items-center text-gray-400 text-sm">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.15s]">●</span>
                <span className="animate-bounce [animation-delay:0.3s]">●</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2 items-end">
        <textarea
          className="flex-1 border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
          rows={2}
          placeholder="ถามเกี่ยวกับเชียงใหม่... (Enter เพื่อส่ง, Shift+Enter ขึ้นบรรทัดใหม่)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-800 transition-colors h-fit"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}