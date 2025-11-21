-- CreateEnum
CREATE TYPE "ClinicType" AS ENUM ('LEVEL1', 'LEVEL2');

-- CreateEnum
CREATE TYPE "ConsultStatus" AS ENUM ('DRAFT', 'PENDING_HUB_REVIEW', 'APPROVED', 'IN_TREATMENT');

-- CreateEnum
CREATE TYPE "InvestigationType" AS ENUM ('USG', 'HORMONE_PANEL', 'SEMEN_ANALYSIS', 'OTHER');

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ClinicType" NOT NULL,
    "location" TEXT NOT NULL,
    "hubClinicId" TEXT,
    "aiProvider" TEXT NOT NULL,
    "aiApiKey" TEXT NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "mrn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "medicalHistory" JSONB NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "chiefComplaint" TEXT NOT NULL,
    "historyPresent" JSONB NOT NULL,
    "menstrualHistory" JSONB NOT NULL,
    "obstetricHistory" JSONB NOT NULL,
    "medicalHistory" JSONB NOT NULL,
    "familyHistory" JSONB NOT NULL,
    "socialHistory" JSONB NOT NULL,
    "patientProfile" JSONB NOT NULL,
    "differentialDx" JSONB NOT NULL,
    "investigationPlan" JSONB NOT NULL,
    "treatmentPlan" JSONB NOT NULL,
    "prognosis" JSONB NOT NULL,
    "status" "ConsultStatus" NOT NULL,
    "reviewerId" TEXT,
    "reviewerNotes" JSONB,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investigation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "type" "InvestigationType" NOT NULL,
    "orderedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "results" JSONB NOT NULL,
    "images" TEXT[],
    "aiInterpretation" JSONB,
    "status" TEXT NOT NULL,

    CONSTRAINT "Investigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientTimeline" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "PatientTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Clinic_hubClinicId_idx" ON "Clinic"("hubClinicId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_mrn_key" ON "Patient"("mrn");

-- CreateIndex
CREATE INDEX "Patient_clinicId_idx" ON "Patient"("clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE INDEX "Staff_clinicId_idx" ON "Staff"("clinicId");

-- CreateIndex
CREATE INDEX "Consultation_patientId_idx" ON "Consultation"("patientId");

-- CreateIndex
CREATE INDEX "Consultation_clinicId_idx" ON "Consultation"("clinicId");

-- CreateIndex
CREATE INDEX "Consultation_staffId_idx" ON "Consultation"("staffId");

-- CreateIndex
CREATE INDEX "Consultation_reviewerId_idx" ON "Consultation"("reviewerId");

-- CreateIndex
CREATE INDEX "Consultation_status_idx" ON "Consultation"("status");

-- CreateIndex
CREATE INDEX "Investigation_patientId_idx" ON "Investigation"("patientId");

-- CreateIndex
CREATE INDEX "Investigation_type_idx" ON "Investigation"("type");

-- CreateIndex
CREATE INDEX "Message_consultationId_idx" ON "Message"("consultationId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "PatientTimeline_patientId_idx" ON "PatientTimeline"("patientId");

-- CreateIndex
CREATE INDEX "PatientTimeline_timestamp_idx" ON "PatientTimeline"("timestamp");

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_hubClinicId_fkey" FOREIGN KEY ("hubClinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientTimeline" ADD CONSTRAINT "PatientTimeline_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
