import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import ATSScannerPage from './pages/ATSScannerPage'
import JobMatcherPage from './pages/JobMatcherPage'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'
import Auth from './components/Auth'
import ResumeManager from './pages/ResumeManager'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl bg-slate-950/30 border-b border-slate-800/70">
          <Navbar />
        </div>
        <main className="pt-28">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
              </>
            } />
            <Route path="/features" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <FeaturesSection />
              </section>
            } />
            <Route path="/how-it-works" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <HowItWorks />
              </section>
            } />
            <Route path="/pricing" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <PricingSection />
              </section>
            } />
            <Route path="/ats-scanner" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <ATSScannerPage />
              </section>
            } />
            <Route path="/job-description-matcher" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <JobMatcherPage />
              </section>
            } />
            <Route path="/resumemanager" element={
              <section className="mx-auto max-w-7xl px-6 py-16">
                <ResumeManager />
              </section>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
