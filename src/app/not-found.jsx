import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#070711] px-6 text-center">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-2xl shadow-cyan-500/5">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-400">
          The page you requested does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white"
        >
          Back to portfolio
        </Link>
      </div>
    </section>
  );
}
