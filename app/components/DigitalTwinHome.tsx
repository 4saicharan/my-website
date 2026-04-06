"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NeuralParticlesBackground from "./NeuralParticlesBackground";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";
const CHATBOT_URL = `${CHATBOT_ORIGIN}/?__theme=dark`;

const HEADLINE =
  "I am Sai Asapu. Talk to my Digital Twin to explore my work.";

/** Primary row below the AI card — prompt + optional links in modal */
const PRIMARY_ACTIONS = [
  {
    label: "📄 Get Resume",
    message:
      "Could you share your resume, or summarize your experience and background for me?",
    modalTitle: "Resume & experience",
    modalHint:
      "Paste the prompt into the Digital Twin chat (already copied). Or use the link below.",
    links: [
      {
        label: "Email for resume / CV",
        href: "mailto:contact@saiasapu.com?subject=Resume%20request",
      },
    ] as const,
  },
  {
    label: "🛠️ Top Skills",
    message:
      "What are your top technical skills, tools, and areas of expertise right now?",
    modalTitle: "Skills & stack",
    modalHint:
      "Prompt copied — paste it into the chat. Explore more via link if you like.",
    links: [
      {
        label: "Open site portfolio",
        href: "https://saiasapu.com",
      },
    ] as const,
  },
  {
    label: "☕ Book a Chat",
    message:
      "I'd like to book a short chat or coffee conversation with you. How should we schedule?",
    modalTitle: "Book a conversation",
    modalHint:
      "Prompt copied for the twin. You can also reach out directly:",
    links: [
      {
        label: "Email to schedule",
        href: "mailto:contact@saiasapu.com?subject=Book%20a%20chat%20%E2%80%93%20Sai%20Asapu",
      },
    ] as const,
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{
    title: string;
    message: string;
    hint: string;
    links: readonly { label: string; href: string }[];
  } | null>(null);

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

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const copyPromptToTwin = useCallback((message: string) => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      try {
        win.postMessage(
          JSON.stringify({ type: "gradio", data: [message] }),
          CHATBOT_ORIGIN
        );
        win.postMessage({ type: "chat", text: message }, CHATBOT_ORIGIN);
      } catch {
        /* cross-origin */
      }
    }
    void navigator.clipboard.writeText(message).catch(() => {});
  }, []);

  const sendToTwin = useCallback(
    (message: string) => {
      copyPromptToTwin(message);
      showToast(
        "Prompt copied — paste into the Digital Twin chat (⌘/Ctrl+V)."
      );
    },
    [copyPromptToTwin, showToast]
  );

  const handlePrimaryAction = useCallback(
    (action: (typeof PRIMARY_ACTIONS)[number]) => {
      copyPromptToTwin(action.message);
      setActionModal({
        title: action.modalTitle,
        message: action.message,
        hint: action.modalHint,
        links: action.links,
      });
      showToast(
        "Prompt copied — paste into the chat below (⌘/Ctrl+V)."
      );
    },
    [copyPromptToTwin, showToast]
  );

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
              ref={iframeRef}
              src={CHATBOT_URL}
              title="Sai Asapu Digital Twin"
              className="absolute inset-0 h-full w-full border-0"
              allow="microphone; camera"
              loading="lazy"
            />
          </div>
        </div>

        {/* Primary glowing actions — resume, skills, book a chat */}
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {PRIMARY_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handlePrimaryAction(action)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_32px_-4px_rgba(99,102,241,0.35),0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md transition hover:border-indigo-400/40 hover:bg-indigo-500/[0.12] hover:text-white hover:shadow-[0_0_40px_-2px_rgba(129,140,248,0.45)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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
              onClick={() => sendToTwin(action.message)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_28px_rgba(99,102,241,0.2)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {action.label}
            </button>
          ))}
        </div>
      </main>

      <footer className="relative z-10 px-4 pb-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Sai Asapu
      </footer>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[200] max-w-md -translate-x-1/2 rounded-xl border border-white/10 bg-slate-950/95 px-4 py-3 text-center text-sm text-slate-200 shadow-2xl backdrop-blur-md"
          role="status"
        >
          {toast}
        </div>
      )}

      {actionModal && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="action-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={() => setActionModal(null)}
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(99,102,241,0.12)] backdrop-blur-xl ring-1 ring-white/10">
            <div className="border-b border-white/10 bg-gradient-to-r from-indigo-950/50 to-slate-950/50 px-5 py-4">
              <h2
                id="action-modal-title"
                className="text-lg font-semibold text-white"
              >
                {actionModal.title}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Prompt ready for the Digital Twin
              </p>
            </div>
            <div className="space-y-4 px-5 py-4">
              <p className="text-sm leading-relaxed text-slate-300">
                {actionModal.hint}
              </p>
              <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-xs leading-relaxed text-slate-200">
                {actionModal.message}
              </div>
              <div className="flex flex-col gap-2">
                {actionModal.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank" as const, rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-100 transition hover:border-indigo-400/50 hover:bg-indigo-500/20"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <span className="ml-2 text-indigo-300/80">↗</span>
                    )}
                  </a>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(actionModal.message);
                    showToast("Prompt copied again.");
                  }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  Copy prompt again
                </button>
                <button
                  type="button"
                  onClick={() => setActionModal(null)}
                  className="flex-1 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
