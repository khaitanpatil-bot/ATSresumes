export default function Hero() {
  return (
    <section id="top" className="hero-gradient-bg overflow-hidden rounded-[2rem] px-6 py-16 shadow-2xl shadow-slate-950/40">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Trusted by 1M+ resumes scanned
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Beat the ATS. Land Your Dream Job.
            </h1>
            <p className="max-w-2xl text-slate-200 text-lg leading-8">
              AI-powered resume scanner that shows exactly how recruiters see your resume.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/ats-scanner" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100">
              Scan Resume Free
            </a>
            <a href="#demo" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:border-white hover:bg-white/10">
              Watch Demo
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5 text-sm text-slate-100 backdrop-blur">
              <span className="block text-2xl font-semibold text-white">95%</span>
              Success Rate
            </div>
            <div className="rounded-3xl bg-white/10 p-5 text-sm text-slate-100 backdrop-blur">
              <span className="block text-2xl font-semibold text-white">1M+</span>
              Resumes Scanned
            </div>
            <div className="rounded-3xl bg-white/10 p-5 text-sm text-slate-100 backdrop-blur">
              <span className="block text-2xl font-semibold text-white">Fortune 500</span>
              Trusted by enterprise teams
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-400 to-sky-400" />
          <div className="space-y-5">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Resume Scanner</span>
                <span>Live Preview</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-3 rounded-full bg-slate-800" />
                <div className="h-3 w-5/6 rounded-full bg-slate-800" />
                <div className="h-3 w-3/4 rounded-full bg-slate-800" />
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/95 p-6 shadow-inner shadow-slate-950/50">
              <h2 className="text-xl font-semibold text-white">ATS Score</h2>
              <div className="mt-4 rounded-full bg-slate-800/80 p-1">
                <div className="h-3 rounded-full bg-emerald-400" style={{ width: '78%' }} />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>78 / 100</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">Good Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
