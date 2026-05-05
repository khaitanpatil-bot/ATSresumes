export default function ResultsPreview({ data }) {
  if (!data) return null;

  const { atsScore = 0, scoreItems = [], issuesFound = [] } = data;

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Real-time Scan Results</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Your ATS Performance</h2>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">Live Preview</span>
        </div>
        <div className="mt-8 rounded-[2rem] bg-slate-950/90 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">ATS Score</p>
              <p className="mt-2 text-4xl font-semibold text-white">{atsScore} / 100</p>
            </div>
            <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-emerald-300">
              {atsScore >= 80 ? 'Excellent Match' : atsScore >= 50 ? 'Good Match' : 'Needs Improvement'}
            </div>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${atsScore}%`, transition: 'width 1s ease-out' }} />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {scoreItems.map((item, index) => (
            <div key={index} className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">Issues Found ({issuesFound.length})</h3>
        <p className="mt-3 text-slate-400">Improve these areas to boost your ATS score.</p>
        <ul className="mt-6 space-y-4 text-slate-200">
          {issuesFound.map((issue, index) => (
            <li key={index} className="flex items-start gap-3 rounded-3xl bg-slate-950/70 p-4">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 shrink-0">
                {index + 1}
              </span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
