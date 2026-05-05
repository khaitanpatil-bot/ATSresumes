import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { extractTextFromFile } from '../lib/fileParser'

export default function ResumeManager() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      setError(null)
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Not authenticated')
        return
      }

      const { data, error: err } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (err) throw err
      setResumes(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    if (!uploadedFile) return

    try {
      setIsUploading(true)
      setError(null)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Parse the text from the file for AI processing
      const content = await extractTextFromFile(uploadedFile)

      // Upload the actual file to Supabase Storage (Bucket: 'resumes')
      const filePath = `${user.id}/${uploadedFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, uploadedFile, { upsert: true })

      if (uploadError) {
        console.error("Storage upload error:", uploadError)
        // We throw an informative error if the bucket doesn't exist yet
        if (uploadError.message.includes('bucket')) {
           throw new Error('Supabase Storage Bucket "resumes" is not configured yet. Please check the setup instructions.')
        }
        throw new Error('Failed to upload file to storage.')
      }

      // Insert into database for metadata and text
      const { data, error: err } = await supabase
        .from('resumes')
        .insert([
          {
            user_id: user.id,
            filename: uploadedFile.name,
            content: content,
          },
        ])
        .select()

      if (err) throw err

      setUploadedFile(null)
      fetchResumes()
      alert('Resume uploaded successfully!')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const downloadOriginalFile = async (filename) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const filePath = `${user.id}/${filename}`
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(filePath)

      if (error) {
        throw new Error('Could not download file. It might not exist in the storage bucket.')
      }

      // Create a temporary link to download the blob
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
       alert(err.message)
    }
  }

  const deleteResume = async (id, filename) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      // 1. Delete from storage bucket
      const filePath = `${user.id}/${filename}`
      await supabase.storage.from('resumes').remove([filePath])

      // 2. Delete from database
      const { error: err } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)

      if (err) throw err
      fetchResumes()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="text-center py-8">Loading resumes...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Resume Manager</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-500 text-red-100 rounded">
          {error}
        </div>
      )}

      <div className="mb-8 p-6 bg-slate-900 rounded-xl border border-slate-800">
        <label className="block text-sm font-medium mb-3 text-slate-300">
          Upload Resume (PDF, DOCX, TXT)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400"
          />
          <button
            onClick={handleUpload}
            disabled={!uploadedFile || isUploading}
            className="px-6 py-3 bg-emerald-500 text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 disabled:opacity-50 transition flex items-center justify-center whitespace-nowrap min-w-[120px]"
          >
            {isUploading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Save Resume'
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Your Saved Resumes</h3>
        {resumes.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
            No resumes saved yet. Upload one above!
          </div>
        ) : (
          <ul className="space-y-3">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition"
              >
                <div>
                  <p className="font-medium text-slate-200">{resume.filename}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(resume.created_at).toLocaleDateString()} at{' '}
                    {new Date(resume.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadOriginalFile(resume.filename)}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => deleteResume(resume.id, resume.filename)}
                    className="px-3 py-1.5 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/20 hover:text-red-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}