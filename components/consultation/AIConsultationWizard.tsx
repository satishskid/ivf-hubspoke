'use client'

import { useState } from 'react'

interface PatientData {
  chiefComplaint: string
  historyPresent: any[]
  menstrualHistory: any
  obstetricHistory: any
  medicalHistory: any
  familyHistory: any
  socialHistory: any
}

export default function AIConsultationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [patientData, setPatientData] = useState<PatientData>({
    chiefComplaint: '',
    historyPresent: [],
    menstrualHistory: {},
    obstetricHistory: {},
    medicalHistory: {},
    familyHistory: {},
    socialHistory: {}
  })
  const [aiProvider, setAiProvider] = useState<'GROQ' | 'GEMINI'>('GROQ')
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const steps = [
    { id: 1, name: 'Chief Complaint' },
    { id: 2, name: 'Medical History' },
    { id: 3, name: 'Patient Profile' },
    { id: 4, name: 'Investigations' },
    { id: 5, name: 'Treatment Plan' }
  ]

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setLoading(true)
      
      try {
        // Call AI service for the current step
        const response = await fetch('/api/ai/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phase: getPhaseName(currentStep),
            patientData: patientData,
            aiProvider: aiProvider
          }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to get AI response')
        }
        
        const result = await response.json()
        setAiResponse(result)
      } catch (error) {
        console.error('Error getting AI response:', error)
      } finally {
        setLoading(false)
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getPhaseName = (step: number) => {
    switch (step) {
      case 1: return 'chiefComplaint'
      case 2: return 'systematicHistory'
      case 3: return 'patientProfile'
      case 4: return 'investigationPlan'
      case 5: return 'treatmentPlan'
      default: return ''
    }
  }

  const updatePatientData = (field: keyof PatientData, value: any) => {
    setPatientData({
      ...patientData,
      [field]: value
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">AI-Guided Consultation</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">AI Provider</label>
        <select
          value={aiProvider}
          onChange={(e) => setAiProvider(e.target.value as 'GROQ' | 'GEMINI')}
          className="p-2 border rounded"
        >
          <option value="GROQ">Groq (Fast)</option>
          <option value="GEMINI">Google Gemini</option>
        </select>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                {step.id}
              </div>
              <div className="mt-2 text-sm text-center">{step.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Chief Complaint & History</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Concern</label>
                <input
                  type="text"
                  value={patientData.chiefComplaint}
                  onChange={(e) => updatePatientData('chiefComplaint', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Inability to conceive, menstrual irregularity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration of Trying to Conceive</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 12 months"
                />
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Patient age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Menstrual History</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Cycle regularity, LMP, flow characteristics"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Obstetric History</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="G_P_L_A_, details of each pregnancy"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Patient Profile</h2>
            {aiResponse ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold">AI-Generated Summary</h3>
                  <p>{aiResponse.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Risk Factors</h3>
                    <ul className="list-disc pl-5">
                      {aiResponse.riskFactors?.modifiable?.map((factor: string, index: number) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Key Concerns</h3>
                    <ul className="list-disc pl-5">
                      {aiResponse.keyConcerns?.map((concern: string, index: number) => (
                        <li key={index}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p>Processing patient profile with AI...</p>
            )}
          </div>
        )}
        
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Investigation Plan</h2>
            {aiResponse ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded">
                  <h3 className="font-semibold">Recommended Investigations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {aiResponse.investigations?.map((investigation: any, index: number) => (
                      <li key={index}>
                        <strong>{investigation.test}</strong> - {investigation.indication}
                      </li>
                    ))}
                  </ul>
                </div>
                {aiResponse.requiresHubReview && (
                  <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800">Hub Review Required</h3>
                    <p>This case requires specialist review at a Level 2 hub.</p>
                  </div>
                )}
              </div>
            ) : (
              <p>Generating investigation plan with AI...</p>
            )}
          </div>
        )}
        
        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Treatment Plan</h2>
            {aiResponse ? (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded">
                  <h3 className="font-semibold">Treatment Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {aiResponse.treatmentPlan?.phase1?.interventions?.map((intervention: any, index: number) => (
                      <li key={index}>
                        <strong>{intervention.intervention}</strong> - {intervention.details}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold">Projected Outcomes</h3>
                  <p>3 months: {aiResponse.projectedOutcome?.cumulativeSuccessRate?.['3months'] * 100}% success rate</p>
                  <p>6 months: {aiResponse.projectedOutcome?.cumulativeSuccessRate?.['6months'] * 100}% success rate</p>
                  <p>12 months: {aiResponse.projectedOutcome?.cumulativeSuccessRate?.['12months'] * 100}% success rate</p>
                </div>
              </div>
            ) : (
              <p>Generating treatment plan with AI...</p>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded ${
            currentStep === 1 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Back
        </button>
        
        {currentStep < steps.length ? (
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Next'}
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Complete Consultation
          </button>
        )}
      </div>
    </div>
  )
}