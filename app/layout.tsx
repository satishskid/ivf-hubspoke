import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fertility Hub-Spoke AI System',
  description: 'AI-assisted fertility clinic management for rural India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Clerk environment variables are set
  const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'YOUR_PUBLISHABLE_KEY' &&
                      process.env.CLERK_SECRET_KEY && 
                      process.env.CLERK_SECRET_KEY !== 'YOUR_SECRET_KEY';

  if (hasClerkKeys) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    );
  }

  // Fallback when Clerk is not configured
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}