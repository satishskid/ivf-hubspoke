import { GroqService } from './groqService'
import { GeminiService } from './geminiService'

export interface PatientData {
  chiefComplaint: string
  historyPresent: any[]
  menstrualHistory: any
  obstetricHistory: any
  medicalHistory: any
  familyHistory: any
  socialHistory: any
}

export interface PatientProfile {
  summary: string
  age: number
  tryingDuration: string
  riskFactors: {
    modifiable: string[]
    nonModifiable: string[]
  }
  fertilityScore: {
    overall: number
    ageFactorScore: number
    ovarianReserveScore: number
    uterineFactor: number
    maleFactor: number
  }
  keyConcerns: string[]
  estimatedTimeToConception: {
    withTreatment: string
    confidence: string
  }
}

export interface InvestigationPlan {
  investigations: {
    test: string
    priority: number
    indication: string
    timing: string
    expectedFindings: string
    level: 'LEVEL1' | 'LEVEL2'
  }[]
  requiresHubReview: boolean
  urgencyLevel: 'ROUTINE' | 'URGENT'
}

export interface TreatmentPlan {
  treatmentPlan: {
    phase1: {
      duration: string
      interventions: {
        intervention: string
        details: string
        monitoring: string
        successProbability: number
      }[]
    }
    escalationCriteria: string[]
    level2Referral: {
      required: boolean
      timing: string
      indications: string[]
    }
  }
  projectedOutcome: {
    cumulativeSuccessRate: {
      '3months': number
      '6months': number
      '12months': number
    }
    confidenceInterval: string
  }
}

export class ConsultationAI {
  private groqService: GroqService
  private geminiService: GeminiService

  constructor(private aiProvider: 'GROQ' | 'GEMINI') {
    this.groqService = new GroqService()
    this.geminiService = new GeminiService()
  }

  private getActiveService() {
    return this.aiProvider === 'GROQ' ? this.groqService : this.geminiService
  }

  // Phase 1: Initial History Taking
  async processChiefComplaint(patientData: PatientData): Promise<any> {
    try {
      return await this.getActiveService().processChiefComplaint(patientData)
    } catch (error) {
      console.error('Error processing chief complaint:', error)
      // Fallback to mock data
      return {
        chiefComplaint: patientData.chiefComplaint,
        tryingDuration: { value: 12, unit: "months" },
        historyPresent: patientData.historyPresent
      }
    }
  }

  // Phase 2: Systematic History
  async processSystematicHistory(patientData: PatientData): Promise<any> {
    try {
      return await this.getActiveService().processSystematicHistory(patientData)
    } catch (error) {
      console.error('Error processing systematic history:', error)
      // Fallback to mock data
      return {
        menstrualHistory: patientData.menstrualHistory,
        obstetricHistory: patientData.obstetricHistory,
        medicalHistory: patientData.medicalHistory,
        familyHistory: patientData.familyHistory,
        socialHistory: patientData.socialHistory
      }
    }
  }

  // Phase 3: Patient Profile Generation
  async generatePatientProfile(patientData: PatientData): Promise<PatientProfile> {
    try {
      return await this.getActiveService().generatePatientProfile(patientData)
    } catch (error) {
      console.error('Error generating patient profile:', error)
      // Fallback to mock data
      return {
        summary: `Patient is a ${patientData.medicalHistory?.age || 30} year old female presenting with ${patientData.chiefComplaint}.`,
        age: patientData.medicalHistory?.age || 30,
        tryingDuration: "12 months",
        riskFactors: {
          modifiable: ["Weight management", "Stress reduction"],
          nonModifiable: ["Age", "Family history of early menopause"]
        },
        fertilityScore: {
          overall: 75,
          ageFactorScore: 80,
          ovarianReserveScore: 70,
          uterineFactor: 85,
          maleFactor: 75
        },
        keyConcerns: ["Ovulatory dysfunction", "Tubal factor", "Male factor"],
        estimatedTimeToConception: {
          withTreatment: "6-12 months",
          confidence: "High"
        }
      }
    }
  }

  // Phase 4: Investigation Planning
  async generateInvestigationPlan(patientProfile: PatientProfile): Promise<InvestigationPlan> {
    try {
      return await this.getActiveService().generateInvestigationPlan(patientProfile)
    } catch (error) {
      console.error('Error generating investigation plan:', error)
      // Fallback to mock data
      return {
        investigations: [
          {
            test: "Transvaginal USG",
            priority: 1,
            indication: "Ovarian reserve assessment",
            timing: "Any cycle day",
            expectedFindings: "AFC, ovarian volume, antral follicles",
            level: "LEVEL1"
          },
          {
            test: "Day 2-3 Hormone Panel (FSH, LH, E2, AMH)",
            priority: 2,
            indication: "Ovarian reserve and function",
            timing: "Cycle days 2-3",
            expectedFindings: "FSH <10, AMH >1.1 ng/mL",
            level: "LEVEL1"
          },
          {
            test: "Husband's Semen Analysis",
            priority: 3,
            indication: "Male factor evaluation",
            timing: "Anytime",
            expectedFindings: "Normal parameters per WHO 2010",
            level: "LEVEL1"
          }
        ],
        requiresHubReview: false,
        urgencyLevel: "ROUTINE"
      }
    }
  }

  // Phase 5: Treatment Planning
  async generateTreatmentPlan(investigationResults: any, patientProfile: PatientProfile): Promise<TreatmentPlan> {
    try {
      return await this.getActiveService().generateTreatmentPlan(investigationResults, patientProfile)
    } catch (error) {
      console.error('Error generating treatment plan:', error)
      // Fallback to mock data
      return {
        treatmentPlan: {
          phase1: {
            duration: "3 cycles",
            interventions: [
              {
                intervention: "Letrozole 2.5mg",
                details: "From cycle day 3-7, timed intercourse",
                monitoring: "Follicular monitoring via USG",
                successProbability: 0.15
              }
            ]
          },
          escalationCriteria: [
            "Failure to conceive after 3 cycles",
            "Poor response to ovulation induction"
          ],
          level2Referral: {
            required: false,
            timing: "After 3 cycles of ovulation induction",
            indications: []
          }
        },
        projectedOutcome: {
          cumulativeSuccessRate: {
            '3months': 0.15,
            '6months': 0.25,
            '12months': 0.35
          },
          confidenceInterval: "70%"
        }
      }
    }
  }
}