# Fertility Hub-Spoke AI System

An AI-assisted fertility clinic management system designed for rural India, connecting remote clinics (spokes) with central fertility experts (hub) through intelligent automation.

## 🌟 Features

- **AI Consultation Wizard**: Guided patient consultation powered by Groq/Gemini AI
- **Clinic Management Dashboard**: Comprehensive clinic administration interface
- **Secure Authentication**: Clerk-based user authentication and management
- **File Storage**: Cloudflare R2 integration for secure document storage
- **Database Management**: PostgreSQL with Prisma ORM for data persistence
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (NeonDB)
- **Authentication**: Clerk
- **AI Services**: Groq, Google Gemini
- **Storage**: Cloudflare R2 (S3-compatible)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel/Netlify

### System Components
1. **Hub (Central Expert System)**: AI-powered diagnostic assistance
2. **Spoke (Remote Clinics)**: Local clinic management interfaces
3. **Consultation Engine**: AI-driven patient assessment workflows
4. **Data Pipeline**: Secure data synchronization between clinics and hub

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account
- Cloudflare R2 bucket
- AI provider API keys (Groq/Gemini)

### Environment Variables
Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# AI Providers (optional)
GROQ_API_KEY="your_groq_api_key"
GEMINI_API_KEY="your_gemini_api_key"

# Cloudflare R2 Storage
R2_ACCESS_KEY_ID="your_r2_access_key_id"
R2_SECRET_ACCESS_KEY="your_r2_secret_access_key"
R2_BUCKET_NAME="your_bucket_name"
R2_ENDPOINT_URL="your_r2_endpoint_url"
```

### Installation
```bash
npm install
npx prisma generate
npx prisma migrate dev
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🛠️ Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run setup-test-data`: Set up test data
- `npm run test-functionalities`: Test all functionalities
- `npm run test-env`: Test environment variables
- `npm run deploy`: Deploy to Vercel
- `npm run deploy:netlify`: Deploy to Netlify

## 📁 Project Structure

```
.
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utility functions and helpers
├── prisma/              # Prisma schema and migrations
├── scripts/             # Deployment and utility scripts
├── public/              # Static assets
└── styles/              # Global styles
```

## 🔧 Key Components

### Authentication
- Protected routes with Clerk middleware
- User roles: Admin, Doctor, Nurse, Patient
- Secure session management

### AI Integration
- Consultation wizard with dynamic question generation
- Medical history analysis
- Treatment recommendation engine
- Multi-language support

### Data Management
- Clinic registration and management
- Patient record system
- Appointment scheduling
- Treatment tracking

### File Storage
- Secure document upload to Cloudflare R2
- Patient record storage
- Medical image handling
- Access control

## 📊 Database Schema

The system uses PostgreSQL with the following key entities:
- Clinics: Clinic information and location data
- Staff: Healthcare workers with roles
- Patients: Patient demographics and medical history
- Consultations: AI-assisted consultation records
- Appointments: Scheduling system
- Treatments: Treatment plans and tracking

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure build settings
4. Deploy with one click

### Netlify
1. Use provided `netlify.toml` configuration
2. Set environment variables in Netlify dashboard
3. Deploy with `npm run deploy:netlify`

### Manual Deployment
1. Build with `npm run build`
2. Serve with any Node.js compatible server
3. Set environment variables in deployment environment

## 🧪 Testing

Run test scripts to verify functionality:
```bash
npm run test-env          # Test environment setup
npm run setup-test-data   # Set up test data
npm run test-functionalities # Test all features
```

## 📈 Monitoring

The system includes:
- Error tracking
- Performance monitoring
- Usage analytics
- Security logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for rural healthcare accessibility in India
- Powered by modern AI and cloud technologies
- Designed with input from healthcare professionals