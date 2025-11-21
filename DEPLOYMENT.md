# Fertility Hub-Spoke AI System Deployment Guide

This guide provides instructions for deploying the Fertility Hub-Spoke AI System to production using Vercel with a single CLI command.

## 🚀 Single-Shot CLI Deployment

The easiest way to deploy is using the built-in deployment script:

```bash
npm run deploy
```

This command will:
1. Check prerequisites
2. Install dependencies
3. Generate Prisma client
4. Build the application
5. Deploy to Vercel

## 📋 Prerequisites

Before deployment, ensure you have:

1. **Vercel CLI** installed:
   ```bash
   npm install -g vercel
   ```

2. **PostgreSQL client** installed:
   ```bash
   # On macOS with Homebrew
   brew install postgresql
   
   # On Ubuntu/Debian
   sudo apt-get install postgresql-client
   ```

3. **Node.js** (v18 or higher)

## 🔧 Required Services Setup

### 1. Database (PostgreSQL)
The application requires a PostgreSQL database. We recommend [NeonDB](https://neon.tech/) for serverless PostgreSQL:

1. Sign up at [NeonDB](https://neon.tech/)
2. Create a new project
3. Copy the connection string (DATABASE_URL)

### 2. Authentication (Clerk)
For user authentication:

1. Sign up at [Clerk.dev](https://clerk.dev/)
2. Create a new application
3. Get your publishable and secret keys

### 3. AI Providers (Optional)
For AI functionality:

- **Groq**: Sign up at [Groq Cloud](https://console.groq.com/) and get an API key
- **Google Gemini**: Sign up at [Google AI Studio](https://aistudio.google.com/) and get an API key

### 4. File Storage (Optional)
For storing USG images and reports:

1. Sign up for [Cloudflare](https://cloudflare.com/)
2. Create an R2 bucket
3. Get your access keys and endpoint URL

## 🛠️ Environment Variables

After initial deployment, set these environment variables in the Vercel dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `GROQ_API_KEY` | Groq API key | Optional |
| `GEMINI_API_KEY` | Gemini API key | Optional |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key | Optional |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key | Optional |
| `R2_BUCKET_NAME` | Cloudflare R2 bucket name | Optional |
| `R2_ENDPOINT_URL` | Cloudflare R2 endpoint URL | Optional |

## 🎯 Deployment Steps

1. **Run the deployment script**:
   ```bash
   npm run deploy
   ```

2. **Set environment variables** in the Vercel dashboard after deployment

3. **Configure custom domain** (optional) in Vercel dashboard

## 🧪 Post-Deployment Testing

After deployment:

1. Visit your deployed URL
2. Test the clinic management features
3. Test the AI consultation wizard
4. Test file uploads (if R2 configured)
5. Test user authentication (if Clerk configured)

## 🔄 Updates and Redeployment

To update your deployment:

```bash
git add .
git commit -m "Update description"
git push
npm run deploy
```

## 🆘 Troubleshooting

### Common Issues:

1. **Build failures**: Ensure all environment variables are set correctly
2. **Database connection errors**: Verify DATABASE_URL format and credentials
3. **Authentication issues**: Check Clerk keys in Vercel dashboard
4. **AI service errors**: Verify API keys for Groq/Gemini

### Getting Help:

1. Check Vercel logs in the dashboard
2. Verify environment variables are correctly set
3. Ensure database is accessible from Vercel
4. Contact support for service-specific issues

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NeonDB Documentation](https://neon.tech/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Groq Documentation](https://console.groq.com/docs)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)

## 🛡️ Security Considerations

1. Never commit actual API keys to version control
2. Use Vercel's environment variable encryption
3. Regularly rotate API keys
4. Monitor usage of paid services
5. Implement proper access controls

## 📈 Scaling Considerations

1. Vercel automatically scales the frontend
2. NeonDB provides serverless PostgreSQL scaling
3. Consider CDN for static assets
4. Monitor usage of AI services for cost control