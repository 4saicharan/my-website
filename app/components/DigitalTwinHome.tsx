"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NeuralParticlesBackground from "./NeuralParticlesBackground";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

/** Override with `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` if needed. */
const CALENDLY_BOOK_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/scharan627/quick-chat-with-sai-1";

const RESUME_PATH = "/Sai_Asapu_Resume.pdf";

const MAILTO_CONTACT =
  "mailto:saiasapu23@gmail.com?subject=Let's%20Connect!%20-%20Via%20Digital%20Twin";

const HEADLINE =
  "I am Sai Asapu. Talk to my Digital Twin to explore my work.";

export default function DigitalTwinHome() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
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
          href={MAILTO_CONTACT}
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
              src={`${CHATBOT_ORIGIN}/`}
              title="Sai Asapu Digital Twin"
              className="absolute inset-0 h-full w-full border-0"
              allow="microphone; camera"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-10 mx-auto flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 px-1 sm:flex-row sm:gap-5">
          <a
            href={RESUME_PATH}
            download={RESUME_PATH}
            className="group inline-flex min-h-[58px] flex-1 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-slate-950/45 px-6 py-4 text-base font-semibold tracking-wide text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.06),0_8px_40px_-12px_rgba(0,0,0,0.5),0_0_28px_-6px_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-200 hover:border-white/35 hover:bg-slate-950/55 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.1),0_0_40px_-4px_rgba(255,255,255,0.18),0_12px_40px_-12px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-white/25 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
          >
            <span className="text-xl" aria-hidden>
              📄
            </span>
            Download Resume
            <svg
              className="h-5 w-5 text-slate-300 transition group-hover:translate-y-0.5 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
          <a
            href={CALENDLY_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[58px] flex-1 items-center justify-center gap-3 rounded-2xl border border-emerald-400/30 bg-slate-950/45 px-6 py-4 text-base font-semibold tracking-wide text-slate-100 shadow-[inset_0_1px_0_rgba(16,185,129,0.08),0_0_0_1px_rgba(16,185,129,0.12),0_8px_40px_-12px_rgba(0,0,0,0.5),0_0_32px_-8px_rgba(16,185,129,0.28)] backdrop-blur-xl transition duration-200 hover:border-emerald-400/45 hover:bg-slate-950/55 hover:text-white hover:shadow-[inset_0_1px_0_rgba(52,211,153,0.12),0_0_0_1px_rgba(52,211,153,0.2),0_0_44px_-4px_rgba(16,185,129,0.38),0_12px_40px_-12px_rgba(0,0,0,0.55)] focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
          >
            <span className="text-xl" aria-hidden>
              📅
            </span>
            Book Interview
            <svg
              className="h-5 w-5 text-emerald-300/90 transition group-hover:translate-x-0.5 group-hover:text-emerald-100"
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
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Sai Asapu
      </footer>
    </div>
  );
}
