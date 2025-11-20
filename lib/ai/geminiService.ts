import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  PatientData, 
  PatientProfile, 
  InvestigationPlan, 
  TreatmentPlan 
} from './consultationAI'

export class GeminiService {
  private genAI: GoogleGenerativeAI

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables')
    }
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async processChiefComplaint(patientData: PatientData): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `
      You are an expert fertility specialist AI assistant. Process the chief complaint and history of present illness.
      
      Patient Data:
      ${JSON.stringify(patientData, null, 2)}
      
      Please provide a structured response with:
      1. Chief complaint analysis
      2. Duration of trying to conceive
      3. Key symptoms with timeline
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // In a real implementation, we would parse the response into a structured format
      return {
        chiefComplaint: patientData.chiefComplaint,
        tryingDuration: { value: 12, unit: "months" },
        historyPresent: patientData.historyPresent
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      throw new Error('Failed to process chief complaint with Gemini')
    }
  }

  async processSystematicHistory(patientData: PatientData): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `
      You are an expert fertility specialist AI assistant. Process the systematic history.
      
      Patient Data:
      ${JSON.stringify(patientData, null, 2)}
      
      Please provide a structured response with:
      1. Menstrual history analysis
      2. Obstetric history analysis
      3. Medical history analysis
      4. Family history analysis
      5. Social history analysis
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // In a real implementation, we would parse the response into a structured format
      return {
        menstrualHistory: patientData.menstrualHistory,
        obstetricHistory: patientData.obstetricHistory,
        medicalHistory: patientData.medicalHistory,
        familyHistory: patientData.familyHistory,
        socialHistory: patientData.socialHistory
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      throw new Error('Failed to process systematic history with Gemini')
    }
  }

  async generatePatientProfile(patientData: PatientData): Promise<PatientProfile> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `
      You are an expert fertility specialist AI assistant. Generate a comprehensive patient profile.
      
      Patient Data:
      ${JSON.stringify(patientData, null, 2)}
      
      Please provide a structured response with:
      1. Clinical summary
      2. Age
      3. Trying duration
      4. Risk factors (modifiable and non-modifiable)
      5. Fertility score with breakdown
      6. Key concerns
      7. Estimated time to conception
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Parse the JSON response
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonString = text.substring(jsonStart, jsonEnd)
      
      return JSON.parse(jsonString) as PatientProfile
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      throw new Error('Failed to generate patient profile with Gemini')
    }
  }

  async generateInvestigationPlan(patientProfile: PatientProfile): Promise<InvestigationPlan> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `
      You are an expert fertility specialist AI assistant. Generate an investigation plan based on the patient profile.
      
      Patient Profile:
      ${JSON.stringify(patientProfile, null, 2)}
      
      Please provide a structured response with:
      1. List of investigations with priority, indication, timing, and expected findings
      2. Whether hub review is required
      3. Urgency level
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Parse the JSON response
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonString = text.substring(jsonStart, jsonEnd)
      
      return JSON.parse(jsonString) as InvestigationPlan
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      throw new Error('Failed to generate investigation plan with Gemini')
    }
  }

  async generateTreatmentPlan(investigationResults: any, patientProfile: PatientProfile): Promise<TreatmentPlan> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `
      You are an expert fertility specialist AI assistant. Generate a treatment plan based on investigation results and patient profile.
      
      Investigation Results:
      ${JSON.stringify(investigationResults, null, 2)}
      
      Patient Profile:
      ${JSON.stringify(patientProfile, null, 2)}
      
      Please provide a structured response with:
      1. Treatment plan with phases, interventions, and monitoring
      2. Escalation criteria
      3. Level 2 referral requirements
      4. Projected outcomes with confidence intervals
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Parse the JSON response
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonString = text.substring(jsonStart, jsonEnd)
      
      return JSON.parse(jsonString) as TreatmentPlan
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      throw new Error('Failed to generate treatment plan with Gemini')
    }
  }
}