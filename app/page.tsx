'use client'

import { useState } from 'react'
import { useUser, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [clinicType, setClinicType] = useState<'LEVEL1' | 'LEVEL2'>('LEVEL1')
  const { isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const handleContinueToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Fertility Hub-Spoke AI System</h1>
      </div>

      <SignedOut>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Authentication Required</h2>
          <p className="mb-4">Please sign in or sign up to access the system.</p>
          <div className="space-x-4">
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">Clinic Login</h2>
            <div className="mb-4">
              <label className="block mb-2">Select Clinic Type:</label>
              <select 
                value={clinicType}
                onChange={(e) => setClinicType(e.target.value as 'LEVEL1' | 'LEVEL2')}
                className="p-2 border rounded"
              >
                <option value="LEVEL1">Level 1 (Rural Clinic)</option>
                <option value="LEVEL2">Level 2 (Specialist Hub)</option>
              </select>
            </div>
            
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleContinueToDashboard}
            >
              Continue to Dashboard
            </button>
            
            <div className="mt-8">
              <a 
                href="/consultation" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Try AI Consultation Demo
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">System Overview</h2>
            <p className="mb-4">
              AI-assisted fertility clinic management system designed for rural India's healthcare challenges.
            </p>
            <ul className="list-disc text-left pl-5">
              <li>Hub-and-spoke model connecting rural clinics to specialists</li>
              <li>AI-powered clinical decision support</li>
              <li>Real-time collaboration between clinics</li>
              <li>Predictive analytics for treatment outcomes</li>
            </ul>
          </div>
        </div>
      </SignedIn>
    </main>
  )
}