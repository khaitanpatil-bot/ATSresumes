export default function UploadSection() {
  return (
    <section id="upload" className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Main Feature</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Upload Your Resume</h2>
          <p className="mt-3 max-w-2xl text-slate-300">Upload PDF or DOCX and get instant ATS feedback with AI-driven analysis.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200">Quick Scan (Free)</span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">Deep Analysis (Premium)</span>
        </div>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-700/70 bg-slate-950/40 p-10 text-center">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-sky-400">
            <span className="text-3xl">⇪</span>
          </div>
          <p className="text-lg font-medium text-white">Drop your resume here</p>
          <p className="text-slate-400">Supports PDF and DOCX formats</p>
          <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Browse Files
          </button>
        </div>
      </div>
    </section>
  )
}
