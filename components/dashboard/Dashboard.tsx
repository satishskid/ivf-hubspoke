'use client'

import { useUser, useAuth, SignOutButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import FileUpload from '@/components/file-upload/FileUpload'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const { userId, isSignedIn } = useAuth()
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchClinics()
    }
  }, [isSignedIn, userId])

  const fetchClinics = async () => {
    try {
      const response = await fetch('/api/clinics')
      if (!response.ok) {
        throw new Error('Failed to fetch clinics')
      }
      const data = await response.json()
      setClinics(data)
    } catch (error) {
      console.error('Error fetching clinics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You must be signed in to view this page.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Fertility Hub-Spoke AI System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress}</span>
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Clinics</h2>
            
            {loading ? (
              <p>Loading clinics...</p>
            ) : clinics.length > 0 ? (
              <div className="space-y-4">
                {clinics.map((clinic: any) => (
                  <div key={clinic.id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold">{clinic.name}</h3>
                    <p className="text-gray-600">Type: {clinic.type}</p>
                    <p className="text-gray-600">Location: {clinic.location}</p>
                    <p className="text-gray-600">AI Provider: {clinic.aiProvider}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't added any clinics yet.</p>
            )}
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">File Management</h2>
            <FileUpload />
          </div>
        </div>
      </main>
    </div>
  )
}