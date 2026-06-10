"use client";

import Link from "next/link";
import { useState } from "react";
import { Bot, FileText, Mail, Menu, X } from "lucide-react";
import { trackBookInterview, trackDownloadResume } from "@/lib/analytics";

const AI_TWIN_URL = "https://saiasapu-sai-asapu-ai.hf.space/";

const CALENDLY_BOOK_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/scharan627/quick-chat-with-sai-1";

const RESUME_HREF = "/Sai_Asapu_Resume.pdf";
const RESUME_FILENAME = "Sai_Asapu_Resume.pdf";

const MAILTO_CONTACT =
  "mailto:saiasapu23@gmail.com?subject=Let's%20Connect!%20-%20Via%20Portfolio";

const LINKEDIN_URL = "https://www.linkedin.com/in/saiasapu/";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#research", label: "Research" },
];

const HERO_TECH_CHIPS = [
  "Snowflake",
  "Apache Spark",
  "Python",
  "AWS",
  "Kafka",
  "Airflow",
  "dbt",
  "SQL",
  "Azure",
  "PySpark",
  "Databricks",
  "Scala",
];

const METRICS = [
  { value: "7", label: "Years experience" },
  { value: "4", label: "Enterprise clients" },
  { value: "10TB+", label: "Daily data volume" },
  { value: "24/7", label: "AI Twin uptime" },
];

type ExperienceRole = {
  dates: string;
  title: string;
  company: string;
  bullets: string[];
  results: string[];
  tech: string[];
  mostRecent?: boolean;
};

const EXPERIENCE: ExperienceRole[] = [
  {
    dates: "Jul 2024 – Apr 2026",
    title: "Senior Data Engineer",
    company: "Jefferson Bank · San Antonio, TX",
    mostRecent: true,
    bullets: [
      "Architected and optimized large-scale Spark SQL pipelines in Databricks, migrating legacy MapReduce workloads to PySpark for significant throughput gains.",
      "Built ADF pipelines ingesting data from relational and unstructured sources into Azure Data Lake, Databricks, and Azure SQL DW with full lineage tracking.",
      "Designed Star and Snowflake schemas for the enterprise data warehouse; implemented SCD patterns to preserve historical accuracy across dimension tables.",
      "Set up end-to-end observability using Prometheus and Grafana across all data pipelines, reducing mean time to detect pipeline failures.",
      "Deployed Apache Airflow for authoring, scheduling, and monitoring production DAGs; used Kafka for high-throughput web log aggregation feeding downstream analytics.",
      "Delivered Power BI and Tableau dashboards enabling business teams to compare legacy vs. current data and surface KPIs in real time.",
    ],
    results: [
      "Pipeline performance improved post-MapReduce migration",
      "Full observability via Prometheus + Grafana",
    ],
    tech: [
      "PySpark",
      "Databricks",
      "Azure ADF",
      "Kafka",
      "Airflow",
      "Snowflake",
      "Power BI",
      "Tableau",
      "Kubernetes",
      "MongoDB",
    ],
  },
  {
    dates: "Dec 2023 – Jun 2024",
    title: "Senior Data Engineer",
    company: "Country Financial · Bloomington, IL",
    bullets: [
      "Designed and managed full Azure stack: ADF V2, ADLS Gen2, Azure SQL DW, Service Bus, Key Vault, Blob Storage, and App Services — handling lift-and-shift migrations and net-new builds.",
      "Built PySpark jobs on Kubernetes clusters for parallelized data cleaning, preprocessing, and feature engineering on insurance datasets.",
      "Implemented Slowly Changing Dimensions (SCDs) in dimensional data marts using Star and Snowflake schemas to maintain full historical lineage.",
      "Automated and validated data pipelines with Apache Airflow; used Kafka partitioning and replication for high-reliability event streaming.",
      "Created Power BI dashboards and Tableau worksheets with calculated fields, parameters, and filters for business reporting teams.",
    ],
    results: [
      "Full Azure suite migration delivered",
      "SCD historical data preservation across all marts",
    ],
    tech: [
      "PySpark",
      "Azure ADF V2",
      "ADLS",
      "Kubernetes",
      "Kafka",
      "Airflow",
      "Hive",
      "Power BI",
      "Tableau",
      "SQL",
    ],
  },
  {
    dates: "Oct 2022 – Nov 2023",
    title: "Data Engineer",
    company: "Tenet Healthcare · Dallas, TX",
    bullets: [
      "Developed Spark jobs in Scala and PySpark for data cleaning, preprocessing, and encryption of PHI columns using hashing algorithms — ensuring HIPAA-aligned data handling.",
      "Built batch and streaming load pipelines on Snowflake using SnowPipe and Matillion from Azure Data Lake and AWS S3 sources.",
      "Migrated on-premises datasets to AWS S3; implemented Continuous Delivery pipelines using Docker, GitHub Actions, and AWS EC2.",
      "Loaded REST endpoint data into Kafka Producers for downstream broker consumption; performed ETL testing and data profiling with complex SQL across DWH layers.",
    ],
    results: [
      "On-prem to AWS S3 migration completed",
      "PHI column encryption across all pipelines",
    ],
    tech: [
      "Scala",
      "PySpark",
      "Snowflake",
      "SnowPipe",
      "AWS S3",
      "EC2",
      "Kafka",
      "Docker",
      "Power BI",
      "Tableau",
    ],
  },
  {
    dates: "Jan 2018 – Oct 2021",
    title: "Data Engineer",
    company: "Ebix Software India · Hyderabad, India",
    bullets: [
      "Designed and developed ETL processes using IBM DataStage with Transformer, Aggregator, Lookup, CDC, and Surrogate Key stages for enterprise data warehousing.",
      "Converted Hive and SQL queries into optimized RDD transformations in Apache Spark using Scala; wrote PySpark scripts for CIF data warehouse mapping.",
      "Developed MapReduce jobs in Java for data cleaning and validation; built Tableau visualizations to monitor model accuracy on incoming data streams.",
      "Integrated data quality checks into ETL pipelines; wrote complex SQL (sub-queries, joins) for building and testing transformation logic end-to-end.",
    ],
    results: [],
    tech: [
      "Scala",
      "PySpark",
      "IBM DataStage",
      "MapReduce",
      "Hive",
      "Tableau",
      "SQL",
      "Python",
    ],
  },
];

const TECH_STACK_GROUPS = [
  {
    label: "Data & pipelines",
    skills: [
      "Apache Spark",
      "PySpark",
      "Kafka",
      "Airflow",
      "dbt",
      "Delta Lake",
      "Hive",
      "MapReduce",
    ],
  },
  {
    label: "Cloud & storage",
    skills: [
      "AWS (S3, EC2)",
      "Azure (ADF, ADLS, Databricks, Synapse)",
      "Snowflake",
      "Redshift",
      "Blob Storage",
    ],
  },
  {
    label: "Languages",
    skills: ["Python", "SQL", "Scala", "JSON"],
  },
  {
    label: "Databases & warehousing",
    skills: [
      "SQL Server",
      "MongoDB",
      "Cassandra",
      "HBase",
      "Star Schema",
      "SCD",
      "Dimensional Modeling",
    ],
  },
  {
    label: "Visualization & BI",
    skills: ["Power BI", "Tableau", "Streamlit", "Grafana"],
  },
  {
    label: "DevOps & tools",
    skills: [
      "Docker",
      "Kubernetes",
      "Git",
      "Jenkins",
      "REST APIs",
      "Prometheus",
      "Jira",
    ],
  },
  {
    label: "AI & emerging",
    skills: [
      "LLM APIs",
      "Agentic AI",
      "FastAPI",
      "Spark MLlib",
      "Spark GraphX",
    ],
  },
];

const AI_TWIN_PROMPTS = [
  "Tell me about your Spark optimization experience",
  "Are you open to W2 or only C2C?",
  "Describe your Snowflake lakehouse architecture",
];

const RESEARCH_FOCUS = [
  "AI",
  "Big Data",
  "Distributed Systems",
  "Agentic Workflows",
  "Reproducible Research",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="section-label">{children}</h2>;
}

export default function DigitalTwinHome() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky nav */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 md:px-8">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-xs font-bold tracking-wider"
            aria-label="Home"
          >
            SA
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--muted)] transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <span className="nav-avail-badge">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7cb342]" aria-hidden />
              Available July 2026
            </span>
          </div>

          {/* Mobile: availability badge + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <span className="nav-avail-badge text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7cb342]" aria-hidden />
              July 2026
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md border border-[var(--border)] p-1.5 text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[var(--border)] bg-background px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="text-sm text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-3xl px-5 md:px-8">
        {/* Hero */}
        <section className="pb-16 pt-12 md:pt-16">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="pill-green">✓ Open to contract roles</span>
            <span className="pill-neutral">📍 Chicagoland · Remote</span>
            <span className="pill-neutral">
              🎓 EdD candidate · Judson University
            </span>
          </div>

          <h1 className="text-3xl leading-tight tracking-tight md:text-4xl md:leading-[1.15]">
            <span className="font-semibold">Senior Data Engineer</span>
            <br />
            <span className="font-normal text-[var(--muted)]">
              &amp; Generative AI practitioner
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
            7 years building lakehouse pipelines, real-time ingestion systems,
            and ML-ready data products at scale — across healthcare, finance, and
            enterprise cloud environments. Now expanding into agentic AI
            engineering.
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {HERO_TECH_CHIPS.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={RESUME_HREF}
              download={RESUME_FILENAME}
              onClick={() => trackDownloadResume()}
              className="btn-primary"
            >
              ⬇ Download Resume
            </a>
            <a
              href={CALENDLY_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookInterview()}
              className="btn-secondary"
            >
              📅 Book a Call
            </a>
            <a
              href={AI_TWIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Ask my AI Twin →
            </a>
          </div>
        </section>

        {/* Metrics bar */}
        <section className="pb-16">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {METRICS.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p className="text-2xl font-medium md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="work" className="scroll-mt-16 pb-16 md:pb-20">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-12">
            {EXPERIENCE.map((role) => (
              <article
                key={role.dates + role.company}
                className="grid gap-4 md:grid-cols-[140px_1fr]"
              >
                <p className="text-xs text-[var(--muted)]">{role.dates}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold">{role.title}</h3>
                    {role.mostRecent && (
                      <span className="pill-green text-[10px]">
                        Most recent
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {role.company}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 40)}
                        className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {role.results.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.results.map((result) => (
                        <span key={result} className="result-chip">
                          {result}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="scroll-mt-16 pb-16 md:pb-20">
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="space-y-6">
            {TECH_STACK_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-2.5 text-xs text-[var(--muted)]">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Twin */}
        <section className="pb-16 md:pb-20">
          <div className="ai-twin-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <Bot className="h-5 w-5 text-[var(--muted)]" aria-hidden />
                <h2 className="text-base font-semibold">Ask my AI Twin</h2>
              </div>
              <span className="pill-green self-start text-[11px] sm:self-auto">
                Responds instantly · 24/7
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Can&apos;t schedule a call right now? My AI Twin knows my full
              background — ask it about my Snowflake architecture, Spark
              optimization approach, Azure migration experience, or availability
              for contract roles. No scheduling needed.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {AI_TWIN_PROMPTS.map((prompt) => (
                <a
                  key={prompt}
                  href={AI_TWIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip transition hover:bg-[var(--surface-hover)]"
                >
                  {prompt}
                </a>
              ))}
            </div>
            <a
              href={AI_TWIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Try the AI Twin →
            </a>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-16 pb-16 md:pb-20">
          <SectionLabel>Research</SectionLabel>
          <div className="research-accent">
            <h3 className="text-base font-semibold">
              Judson University · Doctor of Education in Computer Science
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Master&apos;s in Management Information Systems — Northern
              Illinois University
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Investigating how large-scale data systems and modern AI
              architectures can be unified — from distributed pipelines to
              intelligent agents — with a focus on real-world production impact.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {RESEARCH_FOCUS.map((area) => (
                <span key={area} className="chip">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-8">
          <div className="flex items-center gap-5">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] transition hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={MAILTO_CONTACT}
              className="text-[var(--muted)] transition hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={RESUME_HREF}
              download={RESUME_FILENAME}
              onClick={() => trackDownloadResume()}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>
          <p className="text-xs text-[var(--muted)]">© 2026 Sai Asapu</p>
        </div>
      </footer>
    </div>
  );
}
