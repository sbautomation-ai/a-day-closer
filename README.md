# A Day Closer

A Bible habit tracker: daily passage, short explanation, reflection prompts, journal, and streak tracking. Readings are chosen by **liturgical season** (Advent, Christmas, Lent, Easter, Ordinary Time).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Supabase** (Auth + Postgres)
- **Prisma** (ORM)

## Setup (plain-language steps)

1. **Copy environment variables**  
   Copy `.env.example` to a new file named `.env` in this folder. You’ll fill in the values in the next steps.

2. **Create a Supabase project**  
   Go to [supabase.com](https://supabase.com), sign in, and create a new project.  
   - In **Settings → Database**, copy the connection strings. Use the one that includes **port 6543** and **`?pgbouncer=true`** for `DATABASE_URL`. Use the one with **port 5432** (direct) for `DIRECT_URL`.  
   - In **Settings → API**, copy the **Project URL** and the **anon public** key. Put them in `.env` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

3. **Install dependencies**  
   In a terminal, in this folder, run:  
   `npm install`  
   If you see a permission error about the npm cache, you may need to fix it first (your system may suggest a command like `sudo chown -R $(whoami) ~/.npm`).

4. **Create the database tables**  
   Run:  
   `npx prisma migrate dev`  
   When asked for a migration name, you can type something like `init`. This creates the tables in your Supabase database.

5. **Load the 365-day reading plan**  
   Run:  
   `npm run seed:reading-plan`  
   This fills the database with the default plan and 365 reading days (many are stubs for another agent to fill later).

6. **Turn on Email auth in Supabase**  
   In the Supabase dashboard, go to **Authentication → Providers** and enable **Email**. Users can then sign up and log in with email and password.

7. **Run the app**  
   Run:  
   `npm run dev`  
   Open [http://localhost:3000](http://localhost:3000). You’ll see the landing page; use **Sign up** to create an account, then you’ll be taken to **Today**.

## Scripts

- `npm run dev` – Start the app for local development.
- `npm run build` – Build for production (runs `prisma generate` then `next build`).
- `npm run seed:reading-plan` – Seed or update the default 365-day plan in the database.

## Admin viewer

To view the full reading plan (for content review), set `ADMIN_EMAIL` in `.env` to your account’s email. After logging in, an **Admin** link appears in the app nav and takes you to `/app/admin/reading-plan`.

## Content for another agent

The file **`content/readingPlan365.ts`** holds the 365 `ReadingDaySeed` entries. Many have empty `explanation` and `reflectionPrompts`; another agent can fill those and then you re-run `npm run seed:reading-plan` to update the database.
