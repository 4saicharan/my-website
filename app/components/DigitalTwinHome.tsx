"use client";

import Link from "next/link";
import NeuralParticlesBackground from "./NeuralParticlesBackground";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

/** Override with `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` if needed. */
const CALENDLY_BOOK_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/scharan627/quick-chat-with-sai-1";

/** Public URL — must match `public/Sai_Asapu_Resume.pdf` */
const RESUME_HREF = "/Sai_Asapu_Resume.pdf";
const RESUME_FILENAME = "Sai_Asapu_Resume.pdf";

const MAILTO_CONTACT =
  "mailto:saiasapu23@gmail.com?subject=Let's%20Connect!%20-%20Via%20Digital%20Twin";

export default function DigitalTwinHome() {
  return (
    <div className="digital-twin-mesh relative min-h-screen overflow-hidden text-white">
      <NeuralParticlesBackground />
      <nav className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-[0.2em] text-slate-200 transition hover:text-white"
          aria-label="Home"
        >
          <span className="sa-logo-glow flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/35 bg-white/5 text-sm font-bold text-white backdrop-blur-md transition group-hover:border-violet-400/50">
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
        <header className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-slate-100 via-indigo-100 to-violet-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl md:leading-tight">
            Sai Asapu: The Career Suite
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-slate-400 md:text-lg">
            Interact with my Digital Twin or use the Career Architect tool to
            optimize your own resume.
          </p>
        </header>

        <div className="glass-twin-card relative flex h-[850px] flex-col overflow-hidden rounded-3xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/90">
                Career Suite
              </p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
                <span>Digital Twin</span>
                <span className="text-slate-600" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  Career Architect
                  <span className="rounded-full border border-violet-400/35 bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                    Beta
                  </span>
                </span>
              </p>
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
            href={RESUME_HREF}
            download={RESUME_FILENAME}
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
