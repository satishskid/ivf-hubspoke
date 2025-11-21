#!/bin/bash

# Fertility Hub-Spoke AI System Deployment Script
# This script deploys the application to Vercel with all required services

set -e  # Exit on any error

echo "🚀 Starting Fertility Hub-Spoke AI System Deployment..."

# Check if required tools are installed
echo "🔍 Checking prerequisites..."
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Please install PostgreSQL."
    exit 1
fi

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Prerequisites check passed."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Set up environment variables
echo "🔐 Setting up environment variables..."
if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production not found. Creating from .env.example..."
    cp .env.example .env.production
    echo "📝 Please update .env.production with your actual credentials before deployment."
    echo "📝 You can edit the file now or set them directly in Vercel dashboard."
    read -p "Press Enter to continue with deployment (you'll need to set environment variables in Vercel)..."
fi

# 3. Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# 4. Build the application
echo "🏗️  Building the application..."
npm run build

# 5. Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo "📝 You'll need to provide the following information during deployment:"

echo "
=====================================
REQUIRED ENVIRONMENT VARIABLES:
=====================================
1. DATABASE_URL - PostgreSQL connection string
2. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - Clerk publishable key
3. CLERK_SECRET_KEY - Clerk secret key
4. GROQ_API_KEY - Groq API key (optional)
5. GEMINI_API_KEY - Gemini API key (optional)
6. R2_ACCESS_KEY_ID - Cloudflare R2 access key (optional)
7. R2_SECRET_ACCESS_KEY - Cloudflare R2 secret key (optional)
8. R2_BUCKET_NAME - Cloudflare R2 bucket name (optional)
9. R2_ENDPOINT_URL - Cloudflare R2 endpoint URL (optional)
=====================================
"

echo "💡 Deployment tip: You can set these environment variables in the Vercel dashboard after initial deployment."

# Run vercel deploy
vercel deploy --prod

echo "🎉 Deployment process completed!"
echo "📋 Next steps:"
echo "1. Set your environment variables in the Vercel dashboard"
echo "2. Configure your domain if needed"
echo "3. Set up your database (NeonDB recommended)"
echo "4. Configure Clerk authentication"
echo "5. Add your AI provider keys (Groq/Gemini)"
echo "6. Set up Cloudflare R2 storage if needed"

echo "
=====================================
DEPLOYMENT COMPLETE
=====================================
Application deployed to Vercel
Database: You'll need to set up PostgreSQL (NeonDB recommended)
Authentication: Configure Clerk in the Vercel dashboard
AI Services: Add Groq/Gemini API keys in Vercel
Storage: Configure Cloudflare R2 if needed
=====================================
"