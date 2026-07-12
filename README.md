# TransitOps — Smart Transport Operations Platform

A centralized web platform that digitizes transport operations for a logistics company: vehicle registry, driver management, trip dispatching, maintenance, fuel/expense tracking, and analytics — enforcing operational business rules automatically (no double-booking, no overloading, no unsafe drivers).

Built as an 8-hour hackathon project.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TanStack Query, Recharts
- **Backend:** Next.js Route Handlers (API routes)
- **Database:** SQLite via Prisma ORM
- **Auth:** JWT cookies + bcrypt password hashing, Role-Based Access Control (RBAC)

## Roles & Access (RBAC)

| Role | Access |
|---|---|
| Fleet Manager | Fleet (Vehicle Registry), Maintenance, Analytics, Settings |
| Dispatcher | Dashboard, Trips |
| Safety Officer | Drivers |
| Financial Analyst | Fuel & Expenses, Analytics |

## Prerequisites

- **Node.js 18.18+** (or 20+) — [download here](https://nodejs.org/)
- **npm** (comes with Node.js) — verify with `npm -v`

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url> transitops
   cd transitops
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and edit if needed:

   ```bash
   cp .env.example .env
   ```

   The defaults work out of the box for local development (SQLite + dev JWT secret).

4. **Create the database & apply schema**

   ```bash
   npx prisma db push
   ```

   This creates a SQLite database at `prisma/dev.db` and applies the Prisma schema.

5. **Seed demo data**

   ```bash
   npx tsx prisma/seed.ts
   ```

   This creates 4 demo users, 5 vehicles, 5 drivers, 4 trips, fuel logs, maintenance logs, and expenses.

6. **Start the dev server**

   ```bash
   npm run dev
   ```

7. **Open the app**

   Navigate to **http://localhost:3000** — you'll be redirected to the login page.

## Demo Accounts

All demo accounts use the password: **`password123`**

| Role | Email |
|---|---|
| Fleet Manager | `fleetmanager@transitops.com` |
| Dispatcher | `dispatcher@transitops.com` |
| Safety Officer | `safety@transitops.com` |
| Financial Analyst | `finance@transitops.com` |

## Core Business Rules

- Vehicle registration number is unique
- Retired / In-Shop vehicles are excluded from trip dispatch
- Suspended / expired-license drivers are excluded from trip dispatch
- Cargo weight cannot exceed vehicle capacity
- Dispatch → vehicle & driver become `On Trip`
- Complete → vehicle & driver return to `Available`, odometer updated, fuel log created
- Cancel → vehicle & driver return to `Available`
- Creating maintenance → vehicle becomes `In Shop`
- Closing maintenance → vehicle returns to `Available` (unless retired)

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (http://localhost:3000) |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma db push` | Apply schema to the database |
| `npx tsx prisma/seed.ts` | Seed demo data |

## Project Structure

```
app/
  (dashboard)/          # Authenticated dashboard pages
    dashboard/          # KPI dashboard
    fleet/              # Vehicle registry (CRUD)
    drivers/            # Driver management (CRUD)
    trips/              # Trip dispatcher
    maintenance/        # Maintenance logs
    fuel-expenses/      # Fuel & expense tracking
    analytics/          # Reports & charts
    settings/           # Depot config & RBAC matrix
    layout.tsx          # Dashboard shell (auth guard + sidebar)
  api/                  # API route handlers
    auth/               # login, logout, me
    drivers/            # GET, POST, PATCH, DELETE
    vehicles/           # GET, POST, PATCH, DELETE
    trips/              # GET, POST, dispatch
  login/                # Login page
  layout.tsx            # Root layout
components/              # Reusable UI (Table, Modal, Badge, Sidebar, etc.)
lib/
  auth.ts               # JWT sign/verify, session helpers
  api-guard.ts          # withAuth() middleware for API routes
  rbac.ts               # Role → module access map
  rules.ts              # Business rule engine (trip/maintenance lifecycle)
  prisma.ts             # Prisma client singleton
prisma/
  schema.prisma         # Database schema (8 models)
  seed.ts               # Demo data seeder
proxy.ts                # Edge middleware (auth + route guards)
```

## Troubleshooting

- **Port 3000 in use:** Run `kill -9 $(lsof -ti :3000)` then `npm run dev` again.
- **Database issues:** Delete `prisma/dev.db`, then re-run `npx prisma db push && npx tsx prisma/seed.ts`.
- **Login not working:** Make sure you ran `npx tsx prisma/seed.ts` to create the demo users. Verify `.env` has `DATABASE_URL` and `JWT_SECRET`.

## License

MIT — built for the TransitOps hackathon.
