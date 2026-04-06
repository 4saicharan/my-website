"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NeuralParticlesBackground from "./NeuralParticlesBackground";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

/** Loads the Space with the question in the `q` query param (URL-encoded). */
function chatUrlWithQuestion(question: string) {
  return `${CHATBOT_ORIGIN}/?q=${encodeURIComponent(question)}`;
}

const HEADLINE =
  "I am Sai Asapu. Talk to my Digital Twin to explore my work.";

const PRIMARY_ACTIONS = [
  {
    label: "📄 Get Resume",
    message:
      "Could you share your resume, or summarize your experience and background for me?",
  },
  {
    label: "🛠️ Top Skills",
    message:
      "What are your top technical skills, tools, and areas of expertise right now?",
  },
  {
    label: "☕ Book a Chat",
    message:
      "I'd like to book a short chat or coffee conversation with you. How should we schedule?",
  },
] as const;

const QUICK_ACTIONS = [
  {
    label: "🚀 View Experience",
    message:
      "Tell me about your professional experience, projects, and what you're building.",
  },
  {
    label: "🛠️ Tech Stack",
    message:
      "What is your tech stack? Which languages, frameworks, and tools do you use?",
  },
  {
    label: "📧 Get in Touch",
    message:
      "How can I reach you or collaborate? Share your preferred contact options.",
  },
] as const;

export default function DigitalTwinHome() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(
    () => `${CHATBOT_ORIGIN}/`
  );

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(HEADLINE.slice(0, i));
      if (i >= HEADLINE.length) {
        window.clearInterval(id);
        setTypingDone(true);
      }
    }, 42);
    return () => window.clearInterval(id);
  }, []);

  const askTwin = useCallback((question: string) => {
    setIframeSrc(chatUrlWithQuestion(question));
  }, []);

  return (
    <div className="digital-twin-mesh relative min-h-screen overflow-hidden text-white">
      <NeuralParticlesBackground />
      <nav className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-[0.2em] text-slate-200 transition hover:text-white"
          aria-label="Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-white shadow-[0_0_24px_rgba(99,102,241,0.25)] backdrop-blur-md transition group-hover:border-indigo-400/40 group-hover:shadow-[0_0_32px_rgba(99,102,241,0.35)]">
            SA
          </span>
        </Link>
        <a
          href="mailto:contact@saiasapu.com"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md transition hover:border-indigo-400/35 hover:bg-white/10 hover:text-white"
        >
          Contact
        </a>
      </nav>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col px-4 pb-16 pt-6 md:px-8 md:pt-10">
        <h1
          className="mb-8 min-h-[4.5rem] text-center text-xl font-light leading-relaxed text-slate-200 md:min-h-[5rem] md:text-2xl md:leading-relaxed"
          aria-live="polite"
        >
          <span className="bg-gradient-to-r from-slate-100 via-indigo-100 to-violet-200 bg-clip-text text-transparent">
            {typed}
          </span>
          {!typingDone && (
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-indigo-400/80 align-middle md:h-7" />
          )}
        </h1>

        <div className="glass-twin-card relative flex min-h-[min(68vh,640px)] flex-col overflow-hidden rounded-3xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/90">
                Digital Twin
              </p>
              <p className="text-sm text-slate-400">Sai Asapu · HF Space</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
          </div>
          <div className="relative min-h-0 flex-1 bg-black/20">
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title="Sai Asapu Digital Twin"
              className="absolute inset-0 h-full w-full border-0"
              allow="microphone; camera"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {PRIMARY_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => askTwin(action.message)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_32px_-4px_rgba(99,102,241,0.35),0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md transition active:scale-[0.98] hover:border-indigo-400/40 hover:bg-indigo-500/[0.12] hover:text-white hover:shadow-[0_0_40px_-2px_rgba(129,140,248,0.45)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => askTwin(action.message)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md transition active:scale-[0.98] hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_28px_rgba(99,102,241,0.2)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {action.label}
            </button>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Sai Asapu
      </footer>
    </div>
  );
}
