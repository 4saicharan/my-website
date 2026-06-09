"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Mail,
  Server,
  Workflow,
} from "lucide-react";
import CareerSuiteIframe from "./CareerSuiteIframe";
import CareerSuiteWalkieTalkie from "./CareerSuiteWalkieTalkie";
import { trackBookInterview, trackDownloadResume } from "@/lib/analytics";

const CHATBOT_ORIGIN = "https://saiasapu-sai-asapu-ai.hf.space";

const CALENDLY_BOOK_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/scharan627/quick-chat-with-sai-1";

const RESUME_HREF = "/Sai_Asapu_Resume.pdf";
const RESUME_FILENAME = "Sai_Asapu_Resume.pdf";

const MAILTO_CONTACT =
  "mailto:saiasapu23@gmail.com?subject=Let's%20Connect!%20-%20Via%20Digital%20Twin";

const LINKEDIN_URL = "https://www.linkedin.com/in/saiasapu/";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const EXPERIENCE = [
  {
    period: "2022 — Present",
    role: "Senior Data Engineer",
    company: "Enterprise Data Platforms",
    detail:
      "Architecting scalable lakehouse pipelines, real-time ingestion, and ML-ready data products across cloud environments.",
  },
  {
    period: "2019 — 2022",
    role: "Data Engineer",
    company: "Analytics & BI",
    detail:
      "Built batch and streaming ETL workflows, optimized Spark jobs, and delivered trusted datasets for analytics teams.",
  },
  {
    period: "2017 — 2019",
    role: "Software / Data Analyst",
    company: "Early Career",
    detail:
      "Developed reporting automation, SQL models, and foundational data engineering practices.",
  },
];

const TECH_STACK = [
  { name: "Python", icon: Code2 },
  { name: "Apache Spark", icon: Layers },
  { name: "AWS", icon: Cloud },
  { name: "SQL", icon: Database },
  { name: "Kafka", icon: GitBranch },
  { name: "Airflow", icon: Workflow },
  { name: "ML / AI", icon: Brain },
  { name: "Distributed Systems", icon: Server },
];

function FadeSection({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DigitalTwinHome() {
  return (
    <div className="lovable-bg relative min-h-screen overflow-x-hidden text-white">
      <CareerSuiteWalkieTalkie />

      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="lovable-mesh-tl absolute inset-0" />
        <div className="lovable-mesh-br absolute inset-0" />
        <div className="lovable-grid absolute inset-0" />
      </div>

      {/* Fixed header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/[0.06] bg-[#030303]/75 backdrop-blur-xl"
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="group flex items-center"
            aria-label="Home"
          >
            <span className="sa-logo-glow flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/40 bg-white/[0.04] text-xs font-bold tracking-wider text-white backdrop-blur-sm transition group-hover:border-indigo-300/60">
              SA
            </span>
          </Link>
          <motion.a
            href={MAILTO_CONTACT}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="contact-btn-glow rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Contact
          </motion.a>
        </nav>
      </motion.header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 md:px-8 md:pt-32">
        {/* Hero */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 text-center md:mb-14"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[1.1]">
            Senior Data Engineer
            <span className="block bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-300 bg-clip-text text-transparent">
              &amp; AI Researcher
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Exploring the intersection of Big Data and Artificial Intelligence.
            Enrolled in PhD at Judson University.
          </p>
        </motion.div>

        {/* Career Suite */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="frosted-career-card relative flex h-[min(850px,75vh)] flex-col overflow-hidden rounded-2xl"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-3 md:px-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-300/90">
                Career Suite
              </p>
              <p className="text-sm text-slate-500">
                Digital Twin · Career Architect
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          </div>
          <div className="relative min-h-0 flex-1 bg-black/30">
            <CareerSuiteIframe
              src={`${CHATBOT_ORIGIN}/`}
              title="Sai Asapu Digital Twin"
            />
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <motion.a
            href={RESUME_HREF}
            download={RESUME_FILENAME}
            onClick={() => trackDownloadResume()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            Download Resume
          </motion.a>
          <motion.a
            href={CALENDLY_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookInterview()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-400/25 bg-indigo-500/[0.08] px-5 py-3.5 text-sm font-medium text-indigo-100 backdrop-blur-sm transition hover:border-indigo-400/40 hover:bg-indigo-500/[0.12]"
          >
            Book Interview
          </motion.a>
        </motion.div>

        {/* Experience */}
        <FadeSection index={3} className="mt-24 md:mt-32">
          <h2 className="mb-10 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
            Experience
          </h2>
          <div className="relative space-y-0">
            <div className="timeline-line absolute top-2 bottom-2 left-[7px] w-px md:left-[9px]" />
            {EXPERIENCE.map((item) => (
              <div key={item.period} className="relative flex gap-6 pb-10 last:pb-0 md:gap-8">
                <div className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-indigo-400/60 bg-[#030303] shadow-[0_0_12px_rgba(99,102,241,0.5)] md:h-[19px] md:w-[19px]" />
                <div>
                  <p className="text-xs font-medium tracking-wide text-indigo-300/70">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm text-slate-400">{item.company}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Research */}
        <FadeSection index={4} className="mt-24 md:mt-32">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
            Research
          </h2>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-violet-300/70">
                  PhD Candidate
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Judson University
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                  Investigating how large-scale data systems and modern AI
                  architectures can be unified — from distributed pipelines to
                  intelligent agents — with a focus on reproducible research and
                  real-world impact.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-200">
                <Brain className="h-3.5 w-3.5" aria-hidden />
                AI &amp; Big Data
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Tech Stack */}
        <FadeSection index={5} className="mt-24 md:mt-32">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300/80">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {TECH_STACK.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center backdrop-blur-sm transition hover:border-indigo-400/25 hover:bg-white/[0.04]"
              >
                <tech.icon
                  className="h-6 w-6 text-indigo-300/80"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-xs font-medium text-slate-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 border-t border-white/[0.06] px-4 py-8"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row md:px-8">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Sai Asapu
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-300"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </motion.a>
            <motion.a
              href={MAILTO_CONTACT}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-300"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
