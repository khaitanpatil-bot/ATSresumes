const steps = [
  { title: 'Upload Resume', description: 'Add your PDF or DOCX file and start the scan.', icon: '1' },
  { title: 'AI Analysis', description: 'Our engine evaluates keywords, formatting, and experience.', icon: '2' },
  { title: 'Get Optimized Resume', description: 'Receive recommendations and a ready-to-apply resume.', icon: '3' }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">How It Works</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Three simple steps to stronger applications.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6 text-center transition hover:-translate-y-1 hover:border-emerald-400/30">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-2xl font-bold text-emerald-300">
              {step.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-slate-400">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
