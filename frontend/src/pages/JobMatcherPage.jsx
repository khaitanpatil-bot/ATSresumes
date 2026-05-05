import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { matchJobDescription } from '../lib/groq';
import { extractTextFromFile } from '../lib/fileParser';

export default function JobMatcherPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setResumes(data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  const handleMatch = async () => {
    if (!jobDescription || (!selectedResumeId && !uploadFile)) {
      setError('Please provide a job description and a resume.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setMatchData(null);
    
    try {
      let resumeText = '';
      
      if (uploadFile) {
        resumeText = await extractTextFromFile(uploadFile);
      } else {
        const resume = resumes.find(r => r.id.toString() === selectedResumeId.toString());
        if (resume && resume.content) {
          resumeText = resume.content;
        } else {
          throw new Error('Could not retrieve resume content.');
        }
      }
      
      const result = await matchJobDescription(resumeText, jobDescription);
      setMatchData(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during matching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Description Matcher</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Match your resume to the description.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6 flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium text-slate-300">Select Resume</label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none"
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  setUploadFile(null);
                }}
              >
                <option value="">Upload New Resume...</option>
                {resumes.map(r => (
                  <option key={r.id} value={r.id}>{r.filename}</option>
                ))}
              </select>
              
              {!selectedResumeId && (
                <div className="mt-4">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => setUploadFile(e.target.files?.[0])}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-400 file:text-slate-950 hover:file:bg-emerald-300"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">Paste Description</label>
              <textarea
                className="mt-2 h-48 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
                placeholder="Paste the description here"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button 
              onClick={handleMatch}
              disabled={loading}
              className="mt-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50 inline-flex items-center justify-center"
            >
              {loading ? (
                 <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              ) : 'Match Resume'}
            </button>
          </div>
          
          <div className="space-y-6 rounded-3xl bg-slate-950/90 p-6">
            {matchData ? (
              <>
                <div className="rounded-3xl bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Match Score</p>
                  <p className="mt-4 text-5xl font-semibold text-white">{matchData.matchScore}%</p>
                  <p className="mt-3 text-slate-400">Strength indicator based on keyword fit and resume relevance.</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Missing Keywords ({matchData.missingKeywords?.length || 0})</p>
                  <ul className="mt-4 space-y-2 text-slate-200">
                    {matchData.missingKeywords?.map((keyword, index) => (
                      <li key={index} className="rounded-2xl bg-slate-950/80 px-4 py-3">
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recommended Changes</p>
                  <p className="mt-3 text-slate-200">{matchData.recommendedChanges}</p>
                </div>
              </>
            ) : (
               <div className="flex items-center justify-center h-full text-slate-500 border border-dashed border-slate-800 rounded-3xl p-6 text-center">
                 Submit a resume and job description to see your match score and recommendations.
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
