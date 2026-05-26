import Link from "next/link";

const MAILTO_CONTACT =
  "mailto:saiasapu23@gmail.com?subject=Let's%20Connect!%20-%20Via%20Digital%20Twin";

export default function Guestbook() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 p-10 text-white">
      <h1 className="mb-4 text-4xl font-bold text-blue-400">Guestbook</h1>
      <p className="mb-8 max-w-md text-center text-slate-400">
        The guestbook is not available on static hosting. Reach out directly
        instead.
      </p>
      <a
        href={MAILTO_CONTACT}
        className="rounded-lg bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-700"
      >
        Contact Sai
      </a>
      <Link
        href="/"
        className="mt-8 text-sm text-slate-500 transition hover:text-slate-300"
      >
        ← Back to Career Suite
      </Link>
    </div>
  );
}
