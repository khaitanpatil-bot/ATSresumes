const matchData = {
  score: 82,
  keywords: ['React', 'AWS', 'Agile'],
  suggestion: 'Add 3 bullet points to better align with the description.'
}

export default function JobMatcherPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Description Matcher</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Match your resume to the description.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6">
            <label className="text-sm font-medium text-slate-300">Paste Description</label>
            <textarea
              className="mt-4 h-48 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
              placeholder="Paste the description here"
            />
            <button className="mt-5 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Match Resume
            </button>
          </div>
          <div className="space-y-6 rounded-3xl bg-slate-950/90 p-6">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Match Score</p>
              <p className="mt-4 text-5xl font-semibold text-white">{matchData.score}%</p>
              <p className="mt-3 text-slate-400">Strength indicator based on keyword fit and resume relevance.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Missing Keywords</p>
              <ul className="mt-4 space-y-2 text-slate-200">
                {matchData.keywords.map((keyword) => (
                  <li key={keyword} className="rounded-2xl bg-slate-950/80 px-4 py-3">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recommended Changes</p>
              <p className="mt-3 text-slate-200">{matchData.suggestion}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
