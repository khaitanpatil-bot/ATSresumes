const plans = [
  {
    name: 'Free',
    price: '$0/mo',
    features: ['Quick Scan', 'Basic ATS score', 'Limited downloads']
  },
  {
    name: 'Pro',
    price: '$19/mo',
    features: ['Deep Analysis', 'Keyword optimization', 'Resume templates']
  },
  {
    name: 'Business',
    price: '$49/mo',
    features: ['Multiple job matching', 'Team analytics', 'LinkedIn sync']
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Plans for every stage of your career.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-[2rem] border border-slate-800/70 bg-slate-950/90 p-8 text-center transition hover:border-emerald-400/30 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{plan.name}</p>
            <p className="mt-6 text-4xl font-semibold text-white">{plan.price}</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-2xl bg-slate-900/70 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
