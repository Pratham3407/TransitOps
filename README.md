# TransitOps — Smart Transport Operations Platform

> **Project by Rudra** | **Hackathon Submission Checklist** ✓
> A full-stack fleet management platform built in Next.js 16, automating transport operations for logistics companies across India.

Built during a hackathon sprint. Enforces operational business rules automatically — no double-booking, no overloading, no unsafe drivers. Live GPS tracking, 24-role RBAC, auto email reminders, and 3 months of demo data out of the box.

---

## Submission Checklist ✓

| # | Deliverable | Status |
|---|---|---|
| 1 | Vehicle Registry (CRUD + live tracking map) | ✅ |
| 2 | Driver Management with license tracking | ✅ |
| 3 | Trip Dispatcher (lifecycle, validation, timeline) | ✅ |
| 4 | Maintenance Logs (open/close, edit) | ✅ |
| 5 | Fuel Log + Expense tracking + Mark Completed | ✅ |
| 6 | Analytics (KPIs, charts, date filters, PDF export) | ✅ |
| 7 | RBAC — 5 roles incl. SUPER_ADMIN | ✅ |
| 8 | Audit Log | ✅ |
| 9 | Safety — License expiry alerts + auto email | ✅ |
| 10 | Dashboard with live KPIs + URL-persistent filters | ✅ |
| 11 | Indian seed data — 191 trips / 188 fuel logs / 90 days | ✅ |
| 12 | Dark mode, animations, responsive UI | ✅ |
| 13 | Automated unit tests (11 passing) | ✅ |
| 14 | Production build verified | ✅ |

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Recharts, Leaflet.js
- **Backend:** Next.js Route Handlers (REST API)
- **Database:** SQLite via Prisma ORM
- **Auth:** JWT cookies (`transitops_token`, HttpOnly) + bcrypt hashing + 5-tier RBAC
- **Email:** Nodemailer for license-expiry reminders
- **Real-time:** Poll-based GPS ping tracking (live vehicle positions)
- **Testing:** Vitest + Testing Library (Jest-compatible)
- **Validation:** Zod on all API endpoints

---

## Roles & Access

| Role | Email | Access |
|---|---|---|
| **Super Admin** | `admin@transitops.com` | All modules — bypasses all role checks |
| **Fleet Manager** | `fleetmanager@transitops.com` | Dashboard, Fleet, Maintenance, Analytics, Settings, Audit |
| **Dispatcher** | `dispatcher@transitops.com` | Dashboard, Trips, Audit |
| **Safety Officer** | `safety@transitops.com` | Dashboard, Drivers, Safety |
| **Financial Analyst** | `finance@transitops.com` | Dashboard, Fuel & Expenses, Analytics |

**Password for all demo accounts:** `password123`

---

## Installation

```bash
# 1. Clone
git clone https://github.com/24CS105-RUDRA/transportit.git
cd transportit

# 2. Install dependencies
npm install

# 3. Environment
cp .env.example .env

# 4. Database + schema
npx prisma db push --force-reset

# 5. Seed (Indian data, 3 months)
npx tsx prisma/seed.ts

# 6. Start
npm run dev        # dev mode (port 3000)
# or
npm run build && npm start   # production
```

Open **http://localhost:3000** → login with any demo account above.

---

## Core Business Rules (enforced automatically)

- ✅ Vehicle registration number is unique (validated on create/edit)
- ✅ Retired / In-Shop vehicles excluded from trip dispatch
- ✅ Suspended / expired-license drivers excluded from trip dispatch
- ✅ Cargo weight ≤ vehicle max capacity
- ✅ Dispatch → vehicle & driver → `On Trip`
- ✅ Complete → vehicle & driver → `Available`, odometer updated, fuel log created
- ✅ Cancel → vehicle & driver → `Available`
- ✅ Maintenance create → vehicle → `In Shop`
- ✅ Maintenance close → vehicle → `Available` (unless retired)
- ✅ License expiry alerts within 30 days (in-app + email)
- ✅ Auto email reminder once per day for expiring licenses (configurable SMTP)

---

## Modules & Features

### 🚛 Vehicle Registry (`/fleet`)
- Full CRUD: create, edit, suspend, retire vehicles
- Indian registration format (`MH 01 AB 1234`) with validation
- Live GPS tracking map (Leaflet) with vehicle positions, marker labels, route replays
- Locate-vehicle dropdown (zoom to any vehicle)
- Acquisition cost, odometer, load capacity tracking
- Vehicle health cards, document uploads, position history

### 👤 Driver Management (`/drivers`)
- Full CRUD with Indian license numbers
- License category (HMV/LMV), expiry date tracking
- Safety score (0–100) with color-coded badges
- Status: Available / On Trip / Off Duty / Suspended
- License expiry warnings within 30 days (highlighted)

### 🗺️ Trip Dispatcher (`/trips`)
- Create / dispatch / complete / cancel trips
- Source/destination (Indian cities), cargo weight, driver+vehicle assignment
- Trip timeline (dispatched → in-transit → completed)
- Live trip summary (distance, fuel, revenue, ETA)
- Cancellation reason tracking
- Status filters & search

### 🔧 Maintenance (`/maintenance`)
- Open / close maintenance logs
- Edit existing logs
- Service types: oil change, brake pad, engine overhaul, tyre replacement, etc.
- Indian garages pre-filled (Mumbai Tata Service, Delhi Truck Center, etc.)
- Cost tracking

### ⛽ Fuel & Expenses (`/fuel-expenses`)
- Fuel logs: liters, cost, date, vehicle, optional trip link
- Cost/L auto-calculated
- Toll + misc expenses per trip
- **Mark as Completed** button for PENDING expenses (full lifecycle)
- Indian diesel price ~₹94/L, Indian toll rates
- Auto-calc cost/L when both cost and liters entered

### 📊 Analytics & Reports (`/analytics`)
- Fleet fuel efficiency (km/L), operational cost, revenue, fleet utilization
- Top costliest vehicles (bar chart)
- Vehicle ROI (revenue vs cost per vehicle)
- Cost breakdown (fuel vs maintenance)
- Quick presets: Last 7 / 30 / 90 / 365 days, All Time
- Custom date range picker
- Export CSV
- **Print to PDF** — clean A4 landscape layout with report header
- Smart Insights: alerts for low utilization, high maintenance, negative ROI

### 🛡️ Safety (`/safety`)
- License expiry tracker with countdown
- Expiring license alerts (in-app + email)
- Auto-send email reminders once per day
- Manual trigger endpoint at `/api/safety/license-reminders`
- Cron endpoint at `/api/cron/license-reminders` (for scheduled jobs)

### 📜 Audit Log (`/audit`)
- Tracks dispatch, complete, cancel, maintenance open/close events
- Filterable by dispatcher / action
- Timestamps with user attribution

### ⚙️ Settings (`/settings`)
- Depot name, currency (default INR ₹), distance unit (km/mi)
- Read-only role permissions matrix — see which role has which module access

### 🏠 Dashboard (`/dashboard`)
- 8 KPI cards (vehicles, drivers, trips, utilization)
- Filter by type / status / region
- Recent trips table
- Fleet health progress bars
- Critical alerts (license expiry, vehicles in shop)
- Trip & driver status breakdown
- **URL-persistent filters** — survive navigation, shareable

---

## API Endpoints (REST)

```
POST   /api/auth/login              # Login → JWT cookie
POST   /api/auth/logout             # Logout
GET    /api/auth/me                 # Current user

GET    /api/vehicles                # List (filters: type, status, region)
POST   /api/vehicles                # Create
PATCH  /api/vehicles/[id]           # Update
DELETE /api/vehicles/[id]           # Delete
GET    /api/vehicles/[id]/detail    # Full vehicle detail
GET    /api/vehicles/[id]/documents # Documents
POST   /api/vehicles/[id]/documents # Upload document
GET    /api/vehicles/[id]/positions # GPS history
POST   /api/vehicles/[id]/positions # Ping GPS
GET    /api/vehicles/positions      # All current positions

GET    /api/drivers
POST   /api/drivers
PATCH  /api/drivers/[id]
DELETE /api/drivers/[id]

GET    /api/trips                   # (filters: status, vehicle, driver)
POST   /api/trips
POST   /api/trips/[id]/dispatch
POST   /api/trips/[id]/complete
POST   /api/trips/[id]/cancel
POST   /api/trips/suggest           # AI suggestion for trip

GET    /api/fuel-logs
POST   /api/fuel-logs

GET    /api/expenses
POST   /api/expenses
PATCH  /api/expenses/[id]           # NEW — mark as completed
DELETE /api/expenses/[id]

GET    /api/maintenance
POST   /api/maintenance
POST   /api/maintenance/[id]/close  # Mark complete

GET    /api/analytics               # (filters: from, to dates)
GET    /api/dashboard/stats         # (filters: type, status, region)
GET    /api/audit

GET    /api/settings
PATCH  /api/settings

POST   /api/safety/license-reminders     # Manual trigger
POST   /api/cron/license-reminders       # For cron jobs (Authorization: Bearer CRON_SECRET)
```

---

## Database Schema

**Models:** User · Driver · Vehicle · Trip · FuelLog · Expense · MaintenanceLog · VehicleDocument · VehiclePosition · Settings · AuditLog

Key relationships:
- `Vehicle` ↔ `Trip` (1-many)
- `Driver` ↔ `Trip` (1-many)
- `Trip` ↔ `FuelLog` / `Expense` (optional)
- `Vehicle` ↔ `VehiclePosition` (GPS history)

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm test` | Run unit tests (Vitest) |
| `npx tsc --noEmit` | TypeScript type-check |
| `npx prisma db push` | Apply schema |
| `npx tsx prisma/seed.ts` | Seed demo data |

---

## Project Structure

```
app/
  (dashboard)/                 # Authenticated pages
    dashboard/                 # KPIs + filters
    fleet/  fleet/[id]/        # Vehicles + GPS map
    drivers/                   # Driver management
    trips/                     # Trip dispatcher
    maintenance/               # Maintenance logs
    fuel-expenses/             # Fuel & expenses
    analytics/                 # Reports (printable)
    safety/                    # License expiry
    audit/                     # Audit log
    settings/                  # Depot + role matrix
  api/                         # REST route handlers
  login/
components/
  Card.tsx, Modal.tsx, Skeleton.tsx, Toast.tsx, Badge.tsx,
  FormField.tsx, MapView.tsx, Sidebar.tsx, DarkModeToggle.tsx
lib/
  auth.ts          # JWT sign/verify + session
  api-guard.ts     # withAuth() middleware
  rbac.ts          # Role → module map + dynamic DB-aware access
  rules.ts         # Business rule engine
  prisma.ts        # Prisma client singleton
  prisma/dynamic.ts # Dynamic RBAC helpers
  mail.ts          # Nodemailer wrapper
  format.ts        # INR currency formatting
  useToast.ts      # Toast hook
prisma/
  schema.prisma    # 8 models
  seed.ts          # 3 months of Indian data
proxy.ts           # Edge middleware (auth + route guards)
tests/
  rbac.test.ts     # 8 RBAC tests
  StatusBadge.test.tsx # 3 component tests
.env.example
```

---

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-in-prod"
CRON_SECRET="optional-secret-for-cron-endpoint"

# SMTP (optional — for license expiry emails)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="user"
SMTP_PASS="pass"
SMTP_FROM="TransitOps <noreply@transitops.com>"
```

If SMTP is not configured, license reminders still show in-app, but no emails are sent.

---

## Testing

```bash
npx vitest run
```

11 tests, all passing:
- `tests/rbac.test.ts` — 8 tests (SUPER_ADMIN, FLEET_MANAGER, DISPATCHER, SAFETY_OFFICER, FINANCIAL_ANALYST access checks)
- `tests/StatusBadge.test.tsx` — 3 component tests

---

## Design Decisions

- **SQLite for dev** — zero setup, file-based, ideal for hackathon demo. Swap to Postgres by changing `DATABASE_URL` and running `prisma db push`.
- **JWT in HttpOnly cookie** — XSS-safe, automatically sent with `credentials: "include"`.
- **Dynamic RBAC** — `lib/rbac.ts` has both hardcoded defaults AND dynamic DB-aware helpers. Proxy/middleware reads from DB on each request so permission changes take effect immediately.
- **Indian-first data** — registration format, GPS routes on NH44, diesel ₹94/L, real garage names, INR currency.
- **Animations & dark mode** — manual dark mode toggle with localStorage, CSS animations for fade-in/scale/lift/pulse on every interactive element.
- **Next.js 16 Proxy (renamed from Middleware)** — runs on edge, validates session + module access on every navigation.

---

## Known Limitations

- SMS gateway not integrated (only email reminders).
- Telematics OBD-II integration not implemented (GPS pings are simulated).
- No multi-language support (English only).
- No PDF export (browsers' built-in print-to-PDF used).

---

