## Objectives

* Scaffold a production-ready Next.js (App Router) project with TypeScript and Tailwind.

* Install and configure Prisma + Neon, NextAuth, Stripe, shadcn/ui, UploadThing, React Hook Form, Zod.

* Define core data models and role/tier system (FREE/PRO, admin).

* Create landing page, auth pages, student/admin dashboard skeletons.

* Add REST/route handlers for internships CRUD, applications, payments, and AI stubs.

## Directory Structure

* `app` — app router pages and route handlers

* `components` — UI components (shadcn and custom)

* `lib` — utilities (auth, prisma, stripe, uploadthing)

* `db` — prisma schema and migrations

* `hooks` — reusable client hooks

* `schemas` — Zod schemas for forms and validations

* `utils` — helpers (formatters, fetchers)

* `features/auth` — auth-related UI and server logic

* `features/students` — student dashboard and related components

* `features/admin` — admin dashboard and related components

## Initialization & Dependencies

* Initialize project: `npx create-next-app@latest internship-platform --ts --eslint`

* Install UI & forms:

  * `tailwindcss postcss autoprefixer`

  * `react-hook-form zod @hookform/resolvers`

  * `shadcn-ui` CLI, `lucide-react`

* Auth & DB:

  * `next-auth @auth/prisma-adapter`

  * `prisma @prisma/client`

  * `@neondatabase/serverless`

* File uploads:

  * `uploadthing @uploadthing/react`

* Payments:

  * `stripe @stripe/stripe-js`

* Misc:

  * `clsx class-variance-authority` (for shadcn)

## Environment Variables

* `DATABASE_URL` — Neon PostgreSQL connection

* `NEXTAUTH_URL` — e.g., `http://localhost:3000`

* `NEXTAUTH_SECRET` — generated secret

* `STRIPE_SECRET_KEY` — server key

* `STRIPE_WEBHOOK_SECRET` — webhook signing secret

* `STRIPE_PRICE_ID` — one-time MAD 300 price ID

* `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`

* `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (for AI stubs)

## Tailwind & Theme

* Configure Tailwind: `tailwind.config.ts`, `postcss.config.js`, `globals.css`.

* Apply palette via CSS variables and Tailwind `extend.colors`:

  * `primary: #1B3C53`, `primary-foreground`

  * `secondary: #234C6A`

  * `accent: #456882`

  * `muted: #D2C1B6`

* Integrate shadcn theme tokens to use palette for components.

## shadcn/ui Setup

* Initialize: `npx shadcn-ui@latest init`

* Generate core components: `button`, `input`, `label`, `card`, `badge`, `avatar`, `table`, `textarea`, `select`, `dialog`, `dropdown-menu`, `form`, `toast`.

* Ensure global styles and fonts are set and components consume the Tailwind palette.

## Prisma + Neon

* `prisma init` → `db/schema.prisma` with PostgreSQL provider.

* Use Neon connection string in `DATABASE_URL`.

* Run `prisma generate` and `prisma migrate dev` after defining models.

## Data Models (Prisma)

* `User`: basic auth fields, `role` enum (`USER`, `ADMIN`), `plan` enum (`FREE`, `PRO`).

* `Account`: OAuth accounts for NextAuth.

* `VerificationToken`: for email flows if used.

* `Profile`: academic info, skills, CV URL.

* `Internship`: posting details, status, tags, openings.

* `Application`: user ↔ internship link, status, unique per user+internship.

* `Payment`: records Stripe payments (amount, currency, status, stripeId).

* Enums: `Role`, `Plan`, `InternshipStatus`, `ApplicationStatus`.

## NextAuth Configuration

* Prisma adapter: `@auth/prisma-adapter` with Prisma client.

* Providers:

  * Credentials (email/password via secure hash with Zod validation).

  * Optional OAuth (e.g., Google) if desired.

* Strategy: JWT sessions (default); include `role` and `plan` in JWT.

* Files:

  * `lib/auth.ts` — NextAuth config (providers, callbacks, adapter).

  * `app/api/auth/[...nextauth]/route.ts` — route handler.

  * `middleware.ts` — protect `/admin` and certain `/dashboard` routes.

## Role & Tier Access

* `role`: `USER` or `ADMIN` guards admin routes/actions.

* `plan`: `FREE` or `PRO` used for feature gating (AI, featured placements, unlimited applications).

* Server components check `session.user.role` and `session.user.plan`.

## UploadThing Setup

* `lib/uploadthing.ts` — file router (CV uploads, 10MB limit, PDF only).

* `app/api/uploadthing/route.ts` — upload endpoint.

* Client dropzone component integrated with `react-hook-form`.

* Store uploaded CV URL in `Profile.cvUrl` and snapshot in `Application.cvUrl` on apply.

## Stripe Integration

* `lib/stripe.ts` — server client.

* Create checkout session endpoint: `app/api/stripe/checkout/route.ts` using `STRIPE_PRICE_ID`, success/cancel URLs.

* Webhook: `app/api/stripe/webhook/route.ts` verifies signature and:

  * Records `Payment` with status.

  * Sets `User.plan = PRO` on `checkout.session.completed`.

* UI: Simple PRO upgrade button in dashboard triggers checkout.

## AI Endpoints (Stubs)

* `app/api/ai/cv-analyze/route.ts` — accepts CV URL or text, returns stub suggestions.

* `app/api/ai/suggestions/route.ts` — basic prompt returning recommended internships from tags.

* `app/api/ai/autofill/route.ts` — generates form autofill hints from profile.

* Use `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`; return deterministic stub if unset.

## API Routes (Internships & Applications)

* `app/api/internships/route.ts` — `GET` list, `POST` create (admin only).

* `app/api/internships/[id]/route.ts` — `GET`, `PATCH`, `DELETE` (admin only).

* `app/api/applications/route.ts` — `GET` user applications, `POST` apply.

* `app/api/applications/[id]/route.ts` — `GET`, `PATCH` status (admin), `DELETE` withdraw.

## Pages & Layouts

* `app/layout.tsx` — global theme, font, shadcn provider.

* `app/page.tsx` — landing page:

  * Hero with Moroccan-friendly aesthetic and palette.

  * Search bar, featured internships.

  * CTA for students and admin.

* Auth:

  * `app/(auth)/login/page.tsx` — React Hook Form + Zod.

  * `app/(auth)/register/page.tsx` — collects name, email, password.

* Student Dashboard:

  * `app/dashboard/page.tsx` — feed of internships, filters (location, tags, mode), apply button.

  * `app/dashboard/applications/page.tsx` — list of user applications with statuses.

  * `app/dashboard/profile/page.tsx` — profile form + CV upload.

* Admin Dashboard:

  * `app/admin/page.tsx` — overview cards (counts), recent applications.

  * `app/admin/internships/page.tsx` — CRUD table for internships.

  * `app/admin/users/page.tsx` — users list, role management.

## Forms & Validation

* Zod schemas in `schemas/*` for login, register, profile, internship, application.

* `react-hook-form` with `zodResolver` and shadcn `Form` components.

## Middleware & Security

* `middleware.ts` with NextAuth to gate `/admin` and redirect unauthorized users.

* Server-side checks in route handlers for actions.

* Password hashing with `bcrypt` (installed) for credentials provider.

* Rate limit on sensitive endpoints (simple in-memory for MVP).

## Developer Experience

* ESLint + Prettier config aligned with Next.js defaults.

* `npm run dev` — local dev server.

* Seed script: `prisma/seed.ts` to insert sample internships and admin user.

* Basic unit tests for schema transforms (optional, later).

## Milestones

1. Initialize project, Tailwind, shadcn components and global theme.
2. Prisma + Neon setup, models, migrations.
3. NextAuth with credentials, Prisma adapter, role/tier in JWT.
4. UploadThing CV upload flow integrated with Profile.
5. Stripe checkout + webhook updates `User.plan` and persists `Payment`.
6. Route handlers for internships and applications.
7. Landing page, auth pages, dashboard skeletons with filters and tables.
8. AI endpoint stubs wired to dashboard widgets.

## Run & Validate

* `npm run dev` to start.

* Validate auth flows (register/login), upload CV, create/apply internships, PRO upgrade checkout, webhook handling, and AI stub responses.

## Notes on Maintainability

* Add concise inline code comments for key flows (auth callbacks, webhook handlers, file router) and docstrings for schemas and route handlers to ensure clarity.

* Keep components modular and server-first with client islands only where necessary.

