import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        hubClinic: true,
        spokeClinics: true,
      }
    })
    return NextResponse.json(clinics)
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return NextResponse.json({ error: 'Failed to fetch clinics' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const clinic = await prisma.clinic.create({
      data: {
        name: body.name,
        type: body.type,
        location: body.location,
        aiProvider: body.aiProvider,
        aiApiKey: body.aiApiKey,
      }
    })
    return NextResponse.json(clinic)
  } catch (error) {
    console.error('Error creating clinic:', error)
    return NextResponse.json({ error: 'Failed to create clinic' }, { status: 500 })
  }
}