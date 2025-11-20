'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AddClinicForm from './AddClinicForm'

interface Clinic {
  id: string
  name: string
  type: 'LEVEL1' | 'LEVEL2'
  location: string
  aiProvider: string
  hubClinic?: Clinic | null
  spokeClinics?: Clinic[]
}

export default function ClinicDashboard() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new dashboard page
    router.push('/dashboard')
  }, [router])

  if (loading) return <div>Redirecting to dashboard...</div>

  return null
}