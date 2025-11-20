import Groq from 'groq-sdk'
import { 
  PatientData, 
  PatientProfile, 
  InvestigationPlan, 
  TreatmentPlan 
} from './consultationAI'

export class GroqService {
  private groq: Groq

  constructor() {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not set in environment variables')
    }
    this.groq = new Groq({ apiKey })
  }

  async processChiefComplaint(patientData: PatientData): Promise<any> {
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
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 1000,
      })

      const response = chatCompletion.choices[0]?.message?.content || ''
      // In a real implementation, we would parse the response into a structured format
      return {
        chiefComplaint: patientData.chiefComplaint,
        tryingDuration: { value: 12, unit: "months" },
        historyPresent: patientData.historyPresent
      }
    } catch (error) {
      console.error('Error calling Groq API:', error)
      throw new Error('Failed to process chief complaint with Groq')
    }
  }

  async processSystematicHistory(patientData: PatientData): Promise<any> {
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
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 1500,
      })

      const response = chatCompletion.choices[0]?.message?.content || ''
      // In a real implementation, we would parse the response into a structured format
      return {
        menstrualHistory: patientData.menstrualHistory,
        obstetricHistory: patientData.obstetricHistory,
        medicalHistory: patientData.medicalHistory,
        familyHistory: patientData.familyHistory,
        socialHistory: patientData.socialHistory
      }
    } catch (error) {
      console.error('Error calling Groq API:', error)
      throw new Error('Failed to process systematic history with Groq')
    }
  }

  async generatePatientProfile(patientData: PatientData): Promise<PatientProfile> {
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
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })

      const response = chatCompletion.choices[0]?.message?.content || '{}'
      return JSON.parse(response) as PatientProfile
    } catch (error) {
      console.error('Error calling Groq API:', error)
      throw new Error('Failed to generate patient profile with Groq')
    }
  }

  async generateInvestigationPlan(patientProfile: PatientProfile): Promise<InvestigationPlan> {
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
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })

      const response = chatCompletion.choices[0]?.message?.content || '{}'
      return JSON.parse(response) as InvestigationPlan
    } catch (error) {
      console.error('Error calling Groq API:', error)
      throw new Error('Failed to generate investigation plan with Groq')
    }
  }

  async generateTreatmentPlan(investigationResults: any, patientProfile: PatientProfile): Promise<TreatmentPlan> {
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
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })

      const response = chatCompletion.choices[0]?.message?.content || '{}'
      return JSON.parse(response) as TreatmentPlan
    } catch (error) {
      console.error('Error calling Groq API:', error)
      throw new Error('Failed to generate treatment plan with Groq')
    }
  }
}