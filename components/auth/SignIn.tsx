'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
            socialButtonsBlockButton: 'bg-white hover:bg-gray-50 text-gray-700',
            socialButtonsBlockButtonText: 'font-medium',
            formFieldInput: 'border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
            card: 'shadow-lg rounded-lg p-6',
          }
        }}
      />
    </div>
  )
}