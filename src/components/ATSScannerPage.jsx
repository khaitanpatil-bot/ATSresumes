import ResultsPreview from './ResultsPreview'

export default function ATSScannerPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-6 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">ATS Scanner</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Upload Your Resume</h2>
        <p className="mt-3 max-w-2xl text-slate-400">Upload PDF or DOCX and start analyzing your resume with instant ATS feedback.</p>
      </div>
      <div className="rounded-[2rem] border border-dashed border-slate-700/80 bg-slate-950/70 p-12 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-3xl">
          📄
        </div>
        <p className="mt-6 text-lg font-semibold text-white">Drop your resume here</p>
        <p className="mt-2 text-sm text-slate-400">Supports PDF and DOCX formats.</p>
        <button className="mt-6 rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
          Browse Files
        </button>
      </div>
      </section>
      <ResultsPreview />
    </div>
  )
}
