# Next.js Basic demo project with Clerk authentication

Job board is Next.js job-finding demo application with two roles - candidate and recruiter. Database -> MongoDB.

### Prerequisites

You would need the following tools installed before running the project locally:

- Node 20
- VSCode (or any preferred IDE)

### Running the project

1. Clone the repository:
   
   ```
   https://github.com/ignatIgnatov/nextjs-job-board.git
   ```
2. Navigate to the project directory:

   ```
   cd (path to your project's folder)
   ```
4. Install the dependencies:
   
   ```
   npm install
   ```
5. Create your app in https://clerk.com to take your CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY

6. Create your account in https://dashboard.stripe.com to take your Secret Key and Publishable Key

7. In .env.local file add the following:

   ```
   DATABASE_URL={YOUR_MONGODB_DATABASE_URL}
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={YOUR_CLERK_PUBLISHABLE_KEY}
   CLERK_SECRET_KEY={YOUR_CLERK_SECRET_KEY}

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   NEXT_PUBLIC_SUPABASE_URL={YOUR_SUPABASE_URL}
   NEXT_PUBLIC_SUPABASE_API_KEY={YOUR_SUPABASE_API_KEY}

   STRIPE_SECRET_KEY={YOUR_STRIPE_SECRET_KEY}
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY={YOUR_STRIPE_PUBLISHABLE_KEY}

   ```
8. Start the project:

   ```
   npm run dev
   ```
9. Access the application:

   - Go to http://localhost:3000
