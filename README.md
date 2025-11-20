# Fertility Hub-Spoke AI System

This is a prototype implementation of the Fertility Hub-Spoke AI System designed for rural India's healthcare challenges.

## Features Implemented

1. **Database Schema** - Prisma schema with models for Clinic, Patient, Staff, Consultation, Investigation, Message, and PatientTimeline
2. **API Routes** - RESTful API endpoints for clinic management
3. **Dashboard UI** - Clinic dashboard with ability to add new clinics
4. **AI Consultation Wizard** - Multi-step AI-guided consultation interface
5. **Frontend Components** - Reusable React components for the dashboard and consultation flow

## Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Mock AI service (placeholder for Gemini/Groq integration)
- **Styling**: Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   - Create a PostgreSQL database
   - Update the DATABASE_URL in `.env`

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/                 # Next.js app router pages
  api/               # API routes
    clinics/         # Clinic management endpoints
    ai/              # AI consultation endpoints
  consultation/      # Consultation wizard page
components/          # React components
  dashboard/         # Dashboard components
  consultation/      # Consultation components
lib/                 # Utility functions and services
  ai/                # AI service implementations
  prisma.ts          # Prisma client setup
prisma/              # Prisma schema and migrations
```

## Next Steps

To fully implement the system as described in the specification:

1. Integrate with real AI providers (Gemini/Groq)
2. Implement authentication with Clerk
3. Add real-time collaboration with WebSockets
4. Implement file storage for USG images
5. Add predictive analytics
6. Implement hub-spoke workflow
7. Add multi-language support
8. Implement proper security measures (encryption, access controls)