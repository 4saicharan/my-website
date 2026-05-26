import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h1 className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Daily Briefing
          </h1>
          <p className="mt-2 text-slate-400">Tracking AI &amp; Immigration</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 text-center text-slate-500">
          <p>The news archive is not available on static hosting.</p>
          <p className="mt-2">
            Visit the Career Suite on the homepage to explore the Digital Twin.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Career Suite
        </Link>
      </div>
    </div>
  );
}
