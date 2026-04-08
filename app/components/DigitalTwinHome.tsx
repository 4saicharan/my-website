"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NeuralParticlesBackground from "./NeuralParticlesBackground";
import SkillRadarModal from "./SkillRadarModal";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

/** Loads the Space with the question in the `q` query param (URL-encoded). */
function chatUrlWithQuestion(question: string) {
  return `${CHATBOT_ORIGIN}/?q=${encodeURIComponent(question)}`;
}

/**
 * Quick Chat booking — override with `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` if needed.
 */
const CALENDLY_BOOK_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/scharan627/quick-chat-with-sai";

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
  const [skillRadarOpen, setSkillRadarOpen] = useState(false);

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

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 px-1 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={CALENDLY_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[48px] w-full max-w-md flex-1 items-center justify-center gap-2.5 rounded-2xl border border-emerald-400/35 bg-gradient-to-b from-emerald-500/[0.18] to-emerald-700/[0.08] px-8 py-3.5 text-[15px] font-semibold tracking-wide text-emerald-50 shadow-[0_0_0_1px_rgba(52,211,153,0.12),0_4px_24px_-4px_rgba(16,185,129,0.35),0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-200 hover:border-emerald-300/50 hover:from-emerald-400/25 hover:to-emerald-800/15 hover:text-white hover:shadow-[0_0_40px_-4px_rgba(52,211,153,0.45),0_8px_32px_-8px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400/45 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99] sm:min-w-[220px] sm:flex-initial"
          >
            <span className="text-lg" aria-hidden>
              📅
            </span>
            Book Interview
            <svg
              className="h-4 w-4 text-emerald-200/90 transition group-hover:translate-x-0.5 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setSkillRadarOpen(true)}
            className="group inline-flex min-h-[48px] w-full max-w-md flex-1 items-center justify-center gap-2.5 rounded-2xl border border-violet-400/35 bg-gradient-to-b from-indigo-600/[0.22] to-violet-900/[0.12] px-8 py-3.5 text-[15px] font-semibold tracking-wide text-indigo-50 shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_4px_28px_-4px_rgba(99,102,241,0.4),0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-200 hover:border-violet-300/45 hover:from-indigo-500/30 hover:to-violet-950/25 hover:text-white hover:shadow-[0_0_44px_-4px_rgba(139,92,246,0.45),0_8px_32px_-8px_rgba(99,102,241,0.25)] focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99] sm:min-w-[220px] sm:flex-initial"
          >
            <span className="text-lg" aria-hidden>
              📡
            </span>
            Skill Radar
            <svg
              className="h-4 w-4 text-violet-200/90 transition group-hover:translate-x-0.5 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
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

      <SkillRadarModal
        open={skillRadarOpen}
        onClose={() => setSkillRadarOpen(false)}
      />
    </div>
  );
}
