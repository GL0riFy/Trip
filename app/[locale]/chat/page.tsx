"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// 📌 กำหนด Type ของ Message ให้ชัดเจน
interface Message {
  role: "user" | "assistant";
  content: string;
}

const i18n: Record<string, { title: string; status: string; placeholder: string; welcome: string; hint: string }> = {
  th: { title: "ผู้ช่วย AI", status: "ออนไลน์", placeholder: "พิมพ์ข้อความที่นี่...", welcome: "มีอะไรให้ช่วยไหมครับ?", hint: "ถามข้อมูลท่องเที่ยว OTOP หรือสถานที่ต่างๆ ได้เลย" },
  en: { title: "AI Assistant", status: "Online", placeholder: "Type your message...", welcome: "How can I help you today?", hint: "Ask about travel destinations, OTOP, or city guides." },
  zh: { title: "人工智能助手", status: "在线", placeholder: "输入消息...", welcome: "有什么我可以帮您的吗？", hint: "咨询旅游信息、OTOP产品或城市指南。" }
};

export default function ChatPage() {
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";
  const t = i18n[currentLocale] || i18n.en;

  // ใช้ Interface Message ที่ประกาศไว้
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, locale: currentLocale }),
      });
      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 font-sans overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-900">{t.title}</h2>
            <p className="text-[10px] text-slate-400 font-medium">{t.status}</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
            <p className="text-sm font-semibold text-slate-600">{t.welcome}</p>
            <p className="text-xs mt-1 max-w-[240px]">{t.hint}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-3 text-sm rounded-2xl ${msg.role === "user" ? "bg-slate-900 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          <button type="submit" className="p-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}