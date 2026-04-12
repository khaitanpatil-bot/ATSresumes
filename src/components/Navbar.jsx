import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Core Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'ATS Scanner', href: '/ats-scanner' },
  { label: 'Description Matcher', href: '/job-description-matcher' }
]

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <Link to="/" className="font-semibold text-white tracking-tight text-xl">
        ResumeATS
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href} className="text-slate-300 transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a href="#login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
          Login
        </a>
        <a href="#signup" className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white">
          Signup
        </a>
      </div>
    </div>
  )
}
