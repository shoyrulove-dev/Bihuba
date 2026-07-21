"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import type { AiAssistantSettings } from "@/types/cms";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3v3" />
      <rect x="5" y="6" width="14" height="11" rx="4" />
      <path d="M8.5 11h.01M15.5 11h.01M9 17l-2 3M15 17l2 3" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M21 3 10 14" />
      <path d="m21 3-7 18-4-7-7-4 18-7Z" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M5 19.5v-3.2A7.8 7.8 0 0 1 3.5 12C3.5 7.6 7.3 4 12 4s8.5 3.6 8.5 8-3.8 8-8.5 8a9 9 0 0 1-3.7-.8L5 19.5Z" />
      <path d="M8.5 11.5h7M8.5 14h4.5" />
    </svg>
  );
}

const suggestions = [
  "BIHUBA hỗ trợ doanh nghiệp những gì?",
  "Muốn tham gia hội viên cần chuẩn bị gì?",
  "Doanh nghiệp mới nên lưu ý thủ tục nào?",
  "Làm sao tìm đối tác giao thương phù hợp?",
];

export function AiAssistantWidget({ settings }: { settings?: AiAssistantSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là Trợ Lý BIHUBA. Tôi có thể hỗ trợ câu hỏi về doanh nghiệp, hội viên, kết nối giao thương, thủ tục kinh doanh cơ bản và tài liệu BIHUBA.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const enabled = settings?.enabled ?? true;

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  if (!enabled) return null;

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const result = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: result.message || "Trợ lý BIHUBA đang bận. Bạn thử lại sau ít phút nhé.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Kết nối trợ lý chưa ổn định. Bạn thử lại giúp mình nhé." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <div className="ai-assistant-widget fixed bottom-[13rem] right-3 z-40">
      {isOpen ? (
        <div className="mb-3 w-[min(92vw,390px)] overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white text-slate-950 shadow-[0_24px_70px_rgba(2,6,23,0.26)]">
          <div className="flex items-center justify-between gap-3 bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                <BotIcon />
              </span>
              <div>
                <p className="text-sm font-bold">Trợ Lý BIHUBA</p>
                <p className="text-xs text-slate-300">Hỗ trợ câu hỏi doanh nghiệp</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMessages(messages.slice(0, 1))}
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              Làm mới
            </button>
          </div>

          <div className="max-h-[48vh] space-y-3 overflow-y-auto bg-slate-50 p-4">
            {visibleMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-cyan-400 font-medium text-slate-950"
                    : "bg-white text-slate-700 shadow-sm"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading ? (
              <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                Đang trả lời...
              </div>
            ) : null}
          </div>

          <div className="space-y-3 border-t border-slate-200 bg-white p-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void ask(suggestion)}
                  className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-800 transition hover:bg-cyan-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Nhập câu hỏi..."
                className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:scale-105 disabled:opacity-50"
                aria-label="Gửi câu hỏi"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          setTimeout(() => inputRef.current?.focus(), 80);
        }}
        className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_14px_24px_rgba(2,6,23,0.26)] transition hover:scale-105"
        aria-label="Mở Trợ Lý BIHUBA"
        title="Trợ Lý BIHUBA"
      >
        <ChatBubbleIcon />
      </button>
    </div>
  );
}
