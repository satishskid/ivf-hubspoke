'use client'

import { useState } from 'react'

interface AddClinicFormProps {
  onClinicAdded: () => void
}

export default function AddClinicForm({ onClinicAdded }: AddClinicFormProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'LEVEL1' | 'LEVEL2'>('LEVEL1')
  const [location, setLocation] = useState('')
  const [aiProvider, setAiProvider] = useState('GEMINI')
  const [aiApiKey, setAiApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/clinics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          location,
          aiProvider,
          aiApiKey,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create clinic')
      }

      // Reset form
      setName('')
      setLocation('')
      setAiApiKey('')
      
      // Notify parent component
      onClinicAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Clinic</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Clinic Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Clinic Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'LEVEL1' | 'LEVEL2')}
            className="w-full p-2 border rounded"
          >
            <option value="LEVEL1">Level 1 (Rural Clinic)</option>
            <option value="LEVEL2">Level 2 (Specialist Hub)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">AI Provider</label>
          <select
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="GEMINI">Google Gemini</option>
            <option value="GROQ">Groq</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">AI API Key</label>
          <input
            type="password"
            value={aiApiKey}
            onChange={(e) => setAiApiKey(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Clinic'}
        </button>
      </form>
    </div>
  )
}