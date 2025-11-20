import { NextResponse } from 'next/server'
import { ConsultationAI } from '@/lib/ai/consultationAI'

export async function POST(request: Request) {
  try {
    const { phase, patientData, aiProvider = 'GROQ' } = await request.json()
    
    // Create AI service with the specified provider
    const aiService = new ConsultationAI(aiProvider)
    
    let result
    
    switch (phase) {
      case 'chiefComplaint':
        result = await aiService.processChiefComplaint(patientData)
        break
      case 'systematicHistory':
        result = await aiService.processSystematicHistory(patientData)
        break
      case 'patientProfile':
        result = await aiService.generatePatientProfile(patientData)
        break
      case 'investigationPlan':
        // For investigation plan, we need the patient profile
        result = await aiService.generateInvestigationPlan(patientData)
        break
      case 'treatmentPlan':
        // For treatment plan, we need investigation results and patient profile
        result = await aiService.generateTreatmentPlan(patientData.investigationResults, patientData.patientProfile)
        break
      default:
        return NextResponse.json({ error: 'Invalid phase' }, { status: 400 })
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('AI consultation error:', error)
    return NextResponse.json({ error: 'Failed to process AI consultation' }, { status: 500 })
  }
}