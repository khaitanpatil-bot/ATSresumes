export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">ResumeATS</p>
          <p className="mt-3 max-w-md text-sm text-slate-400">Build resumes that pass Applicant Tracking Systems and land interviews faster.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</p>
            <div className="mt-3 space-y-2 text-slate-300">
              <a href="#features" className="block hover:text-white">Features</a>
              <a href="#pricing" className="block hover:text-white">Pricing</a>
              <a href="#how-it-works" className="block hover:text-white">How It Works</a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Support</p>
            <div className="mt-3 space-y-2 text-slate-300">
              <a href="#" className="block hover:text-white">Privacy Policy</a>
              <a href="#" className="block hover:text-white">Terms</a>
              <a href="#" className="block hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
