import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function ResumeManager() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

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
      setError(null)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const fileReader = new FileReader()
      fileReader.onload = async (e) => {
        const content = e.target.result
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
      }
      fileReader.readAsText(uploadedFile)
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteResume = async (id) => {
    try {
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
      <h2 className="text-2xl font-bold mb-6">Resume Manager</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium mb-2">Upload Resume (TXT only)</label>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleUpload}
            disabled={!uploadedFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Your Resumes</h3>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
              >
                <div>
                  <p className="font-medium">{resume.filename}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteResume(resume.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}