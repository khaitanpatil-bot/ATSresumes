import { Link } from 'react-router-dom'

const features = [
  { title: 'Resume Upload', description: 'Upload your resume in PDF, DOCX, or TXT to start the scan.', icon: '📄' },
  { title: 'ATS Scan', description: 'Analyze your resume for applicant tracking system compatibility.', icon: '🧪' },
  { title: 'Keyword Match', description: 'Compare your resume against job-specific keywords automatically.', icon: '🔍' },
  { title: 'Format Checker', description: 'Detect sections and formatting that ATS systems may miss.', icon: '🧾' },
  { title: 'Score Summary', description: 'Get an instant recruiter-ready score with improvement guidance.', icon: '📊' },
  { title: 'Actionable Fixes', description: 'Receive practical suggestions to improve resume performance.', icon: '⚡' }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Core Features</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Built around the resume scanning functionality you need.</h2>
        </div>
        <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200">Premium plans include advanced tools</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-slate-900/90">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-400/10 text-2xl">
              {item.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/ats-scanner" className="rounded-full bg-emerald-400 px-8 py-3 text-lg font-semibold text-slate-950 transition hover:bg-emerald-300">
          Scan Resume Free
        </Link>
      </div>
    </section>
  )
}
