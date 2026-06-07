# ResumeForge — Resume Builder SaaS

A modern, beginner-friendly resume builder built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## Features

- **Authentication** — Email/password signup, login, forgot password, protected routes
- **Dashboard** — Manage resumes with create, edit, duplicate, rename, delete
- **Resume Editor** — Live preview, drag-and-drop sections, auto-save, rich sections
- **5 Templates** — Minimal, Professional, Modern, Creative, ATS-Friendly
- **Customization** — Accent colors, fonts, spacing, template switching
- **PDF Export** — Download and print pixel-perfect A4 resumes
- **Dark/Light Mode** — Full theme support
- **SEO Landing Page** — Hero, features, templates, testimonials, FAQ, pricing
- **Mobile Responsive** — Works on all screen sizes

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Backend:** Supabase Auth, PostgreSQL, Row Level Security
- **State:** Zustand with auto-save
- **Forms:** React Hook Form + Zod
- **PDF:** html2canvas + jsPDF

## Getting Started

### 1. Clone and install

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor
3. Copy `.env.local.example` to `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (public)/          # Landing, auth, marketing pages
  (protected)/       # Dashboard, editor, settings
  api/resumes/       # Resume CRUD API routes
components/
  ui/                # shadcn/ui components
  layout/            # Navbar, sidebar, footer
  landing/           # Landing page sections
  templates/         # Resume template renderers
features/
  auth/              # Login, signup, forgot password
  dashboard/         # Dashboard components
  editor/            # Resume editor
  settings/          # Account settings
lib/
  supabase/          # Supabase clients
  templates/         # Template config
  validations/       # Zod schemas
hooks/               # useAutoSave, usePdfExport
store/               # Zustand stores
types/               # TypeScript types
supabase/
  schema.sql         # Database schema + RLS
```

## Future Expansion

Architecture is prepared for:

- AI resume writing & scoring
- Cover letter builder
- Portfolio website generator
- Public resume sharing
- Team collaboration
- Subscription billing
- Multi-language support

## License

MIT
