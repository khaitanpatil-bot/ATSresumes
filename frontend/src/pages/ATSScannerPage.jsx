import { useRef, useState } from 'react'
import ResultsPreview from '../components/ResultsPreview'
import { extractTextFromFile } from '../lib/fileParser'
import { scanResume } from '../lib/groq'

export default function ATSScannerPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)
  const fileInputRef = useRef(null)

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setLoading(true)
      setError(null)
      setResults(null)
      
      try {
        const text = await extractTextFromFile(file);
        const scanData = await scanResume(text);
        setResults(scanData);
      } catch (err) {
        console.error("Scan error:", err);
        setError(err.message || 'An error occurred during scanning.');
      } finally {
        setLoading(false);
      }
    }
  }

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
          <button
            type="button"
            onClick={openFileDialog}
            disabled={loading}
            className="mt-6 rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Browse Files'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFile && !loading && !error && (
            <p className="mt-4 text-sm text-slate-300">Selected file: {selectedFile.name}</p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}
        </div>
      </section>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"></div>
        </div>
      ) : (
        <ResultsPreview data={results} />
      )}
    </div>
  )
}
