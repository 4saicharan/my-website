"use client";

import { useState } from "react";

const CHATBOT_URL = "https://saiasapu-sai-asapu-ai.hf.space";

export default function AiChatbot() {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl shadow-lg shadow-blue-900/40 ring-2 ring-slate-800/80 transition hover:scale-105 hover:shadow-xl hover:shadow-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          aria-label="Open AI chat"
        >
          💬
        </button>
      )}

      {open && (
        <div
          className="flex h-[min(70vh,520px)] w-[min(100vw-2rem,420px)] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(59,130,246,0.15)] backdrop-blur-md ring-1 ring-white/5"
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-800/90 bg-gradient-to-r from-slate-900/95 to-slate-950/95 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-lg">
                ✨
              </span>
              <div>
                <p className="text-sm font-semibold text-white">AI Assistant</p>
                <p className="text-xs text-slate-400">Powered by Hugging Face</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Minimize chat"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="relative min-h-0 flex-1 bg-slate-900/50">
            <iframe
              src={CHATBOT_URL}
              title="Sai Asapu AI Assistant"
              className="absolute inset-0 h-full w-full border-0"
              allow="microphone; camera"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
