import { clerkMiddleware } from "@clerk/nextjs/server";

// Check if Clerk environment variables are set
const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'YOUR_PUBLISHABLE_KEY' &&
                    process.env.CLERK_SECRET_KEY && 
                    process.env.CLERK_SECRET_KEY !== 'YOUR_SECRET_KEY';

// Export either the Clerk middleware or a passthrough middleware
export default hasClerkKeys ? clerkMiddleware() : () => {};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};