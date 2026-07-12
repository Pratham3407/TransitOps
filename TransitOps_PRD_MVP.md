# TransitOps — Product Requirements Document (PRD) & MVP Build Spec

**Prepared for:** AI coding agent (e.g. Claude Code) to build the application
**Source:** TransitOps hackathon problem statement (8-hour build) + UI mockup (9 screens)
**Doc purpose:** Single source of truth an AI builder can implement directly from — no ambiguity on entities, states, or rules.

---

## 1. Product Summary

TransitOps is a centralized web platform that digitizes transport operations for a logistics company: vehicle registry, driver management, trip dispatching, maintenance, fuel/expense tracking, and analytics — replacing spreadsheets and logbooks.

**Core value:** enforce operational business rules automatically (no double-booking vehicles/drivers, no overloaded cargo, no dispatching unsafe drivers or unfit vehicles) and surface real-time fleet visibility.

---

## 2. Roles & Access (RBAC)

Single login, role determines visible modules and permissions.

| Role | Access |
|---|---|
| **Fleet Manager** | Fleet (Vehicle Registry), Maintenance — full CRUD |
| **Dispatcher** | Dashboard, Trips — full CRUD on trips |
| **Safety Officer** | Drivers, Compliance — full CRUD on drivers |
| **Financial Analyst** | Fuel & Expenses, Analytics — view/CRUD on financials |

Rules:
- Every screen is behind authentication — unauthenticated users cannot reach any route.
- Modules not permitted for a role are hidden from the sidebar entirely (not just disabled), per the mockup's Settings screen permission matrix (View / Edit / — per module per role).
- Settings screen (Fleet Manager/Admin only) manages: Depot Name, Currency, Distance Unit, and the Role × Module permission matrix.

---

## 3. Core Entities & Data Model

```
User
 - id, name, email, password_hash, role (enum: FleetManager, Dispatcher, SafetyOfficer, FinancialAnalyst), created_at

Vehicle
 - id, registration_number (unique, required), name_model, type (enum: Van, Truck, Mini, other),
   max_load_capacity_kg, odometer_km, acquisition_cost, status (enum: Available, On Trip, In Shop, Retired),
   created_at, updated_at

Driver
 - id, name, license_number, license_category (enum: LMV, HMV, etc.), license_expiry_date,
   contact_number, safety_score (0-100), status (enum: Available, On Trip, Off Duty, Suspended),
   created_at, updated_at

Trip
 - id, trip_code (e.g. TR001), source, destination, vehicle_id (FK), driver_id (FK),
   cargo_weight_kg, planned_distance_km, status (enum: Draft, Dispatched, Completed, Cancelled),
   dispatched_at, completed_at, final_odometer_km, fuel_consumed_l,
   created_at, updated_at

MaintenanceLog
 - id, vehicle_id (FK), service_type (e.g. Oil Change, Engine Repair, Tyre Replace),
   servicer_name, cost, date, status (enum: Active/In Shop, Completed), created_at

FuelLog
 - id, vehicle_id (FK), trip_id (FK, optional), date, liters, cost, created_at

Expense
 - id, trip_id (FK, optional), vehicle_id (FK), toll, other_misc, total, status (enum: Available/Pending, Completed), created_at

Settings
 - id, depot_name, currency, distance_unit, role_permissions (JSON: role -> module -> access level)
```

**Relationships:** Vehicle 1—N Trips, Driver 1—N Trips, Vehicle 1—N MaintenanceLogs, Vehicle 1—N FuelLogs, Vehicle 1—N Expenses. Trip optionally links to FuelLog/Expense for per-trip cost rollups.

---

## 4. Business Rules (must be enforced server-side, not just UI)

1. `registration_number` on Vehicle is globally unique.
2. Vehicles with status `Retired` or `In Shop` are excluded from the vehicle-selection dropdown in Trip Dispatcher.
3. Drivers with `license_expiry_date` in the past, or status `Suspended`, are excluded from the driver-selection dropdown in Trip Dispatcher.
4. A vehicle or driver already `On Trip` cannot be selected for a new trip.
5. `cargo_weight_kg` on the trip must be ≤ the selected vehicle's `max_load_capacity_kg`. Violation blocks dispatch with an inline error (see mockup: "Capacity exceeded by 200 kg — dispatch blocked").
6. **Dispatch action** (Draft → Dispatched): sets Vehicle.status = On Trip, Driver.status = On Trip. Trip must have vehicle, driver, source, destination, cargo weight, and distance filled before dispatch is allowed.
7. **Complete action** (Dispatched → Completed): requires final odometer + fuel consumed; sets Vehicle.status = Available, Driver.status = Available; updates Vehicle.odometer_km; creates/links a FuelLog entry from the fuel consumed.
8. **Cancel action** (Dispatched → Cancelled): sets Vehicle.status = Available, Driver.status = Available.
9. Creating an active MaintenanceLog sets Vehicle.status = In Shop (vehicle immediately disappears from dispatch pool).
10. Closing/completing a MaintenanceLog sets Vehicle.status = Available — **unless** the vehicle's status was `Retired` prior, in which case it stays Retired.
11. Trip lifecycle is strictly linear/one-directional except for the explicit Cancel path: `Draft → Dispatched → Completed`, or `Dispatched → Cancelled`. No skipping states.
12. Total Operational Cost per vehicle = SUM(FuelLog.cost) + SUM(MaintenanceLog.cost) for that vehicle. Recomputed live whenever a fuel/maintenance record is added.
13. Fleet Utilization % = (vehicles currently On Trip) / (total non-retired vehicles) × 100.
14. Fuel Efficiency = total distance driven / total fuel consumed (km/l), fleet-wide or per-vehicle.
15. Vehicle ROI = (Revenue − (Maintenance + Fuel)) / Acquisition Cost. *(Revenue is a derived/manual input per trip or a flat per-km rate — flag as an assumption to confirm with the user; not explicitly defined in the source doc.)*

---

## 5. Screen-by-Screen Functional Spec

### 0. Authentication
- Email + password login, role dropdown (or role auto-detected from user record — recommend deriving from account, not user-selectable, to avoid privilege escalation via UI).
- "Remember me" checkbox, "Forgot password" link (MVP: stub/non-functional or simple reset-token flow).
- Error state: invalid credentials message; account lock after 5 failed attempts (lockout duration configurable, default e.g. 15 min).
- Sidebar/footer note on role→module mapping for user clarity (matches Settings permission matrix).

### 1. Dashboard
- KPI cards: Active Vehicles, Available Vehicles, Vehicles in Maintenance, Active Trips, Pending Trips, Drivers On Duty, Fleet Utilization (%).
- Filters: Vehicle Type, Status, Region (Region can be a simple free-text/enum field on Vehicle if not otherwise specified).
- Recent Trips table: Trip code, Vehicle, Driver, Status (color-coded badge), ETA/duration.
- Vehicle Status horizontal bar (stacked): Available / On Trip / In Shop / Retired proportions.

### 2. Vehicle Registry (Fleet Manager)
- Table: Reg. No. (unique), Name/Model, Type, Capacity, Odometer, Acquisition Cost, Status (colored badge).
- "+ Add Vehicle" modal/form with all fields; inline validation for duplicate reg. number.
- Search, filter by Type/Status.
- Inline rule note: "Registration No. must be unique. Retired/In Shop vehicles are hidden from Trip Dispatcher."

### 3. Drivers & Safety Profiles (Safety Officer)
- Table: Driver, License No., Category, Expiry (flag expired in red), Contact, Safety Score (%), Status badge.
- "+ Add Driver" form.
- Toggle/status chips: Available, On Trip, Off Duty, Suspended.
- Inline rule note: expired license or Suspended status blocks trip assignment.

### 4. Trip Dispatcher (Dispatcher)
- Trip lifecycle stepper: Draft → Dispatched → Completed → Cancelled.
- Live board: cards per trip showing route, vehicle/driver, status, elapsed/ETA.
- "Create Trip" form: Source, Destination, Vehicle (dropdown filtered to Available only), Driver (dropdown filtered to Available + valid license only), Cargo Weight, Planned Distance.
- Real-time capacity check with inline error if cargo exceeds vehicle capacity (blocks the Dispatch button, Cancel still available).
- Actions per trip: Dispatch, Complete (prompts for final odometer + fuel consumed), Cancel.
- Footnote: "On Complete, odometer → fuel log → expenses → Vehicle & Driver set Available."

### 5. Maintenance (Fleet Manager)
- Log Service Record form: Vehicle (select), Service Type, Cost, Date, Status.
- Service Log table: Vehicle, Servicer, Cost, Date, Status badge (In Shop / Completed).
- Status flow diagram: Available ⇄ In Shop (auto-transition on create/complete).
- Note: "In Shop vehicles are removed from the Trip Dispatcher pool."

### 6. Fuel & Expense Management (Financial Analyst)
- Fuel Logs table: Vehicle, Date, Liters, Cost. "+ Log Fuel" button/form.
- Other Expenses (Toll/Misc) table: Trip, Vehicle, Toll, Other, Maint. (linked), Status, Total.
- Auto-computed footer: **Total Operational Cost (Auto) = Fuel + Maintenance**, shown per vehicle and fleet-wide.

### 7. Reports & Analytics (Financial Analyst / Fleet Manager)
- KPI cards: Fuel Efficiency (km/l), Fleet Utilization (%), Operational Cost, Vehicle ROI (%).
- Formula footnote: `ROI = Revenue − (Maintenance + Fuel) ÷ Acquisition Cost`.
- Monthly Revenue bar chart.
- Top Costliest Vehicles horizontal bar chart.
- CSV export button (mandatory). PDF export = bonus/optional.

### 8. Settings & RBAC (Fleet Manager/Admin)
- General: Depot Name, Currency, Distance Unit.
- Role-based Access matrix: rows = roles (Fleet Manager, Dispatcher, Safety Officer, Financial Analyst), columns = modules (Fleet, Drivers, Trips, Fuel/Exp., Analytics) with View/Edit/— per cell.
- Save Changes button persists to Settings entity.

---

## 6. MVP Scope (build this first — matches "Mandatory Deliverables")

**In scope for MVP:**
1. Auth with RBAC (email/password login, role-based sidebar & route guarding).
2. Vehicle Registry — full CRUD, unique reg. number validation.
3. Driver Management — full CRUD, expiry/status tracking.
4. Trip Management — create/dispatch/complete/cancel with all validation rules (§4, rules 2–8, 11).
5. Automatic status transitions (vehicle/driver ⇄ trip ⇄ maintenance, rules 6–10).
6. Maintenance workflow — create/close records, auto vehicle status flip.
7. Fuel & Expense tracking — logs + auto operational-cost rollup.
8. Dashboard with live KPIs.
9. Reports & Analytics — the 4 KPI cards + at least 1 chart (bar chart is enough), CSV export.
10. Responsive layout (desktop-first is fine, but no horizontal scroll breakage on tablet).

**Explicitly out of scope for MVP (bonus / phase 2):**
- PDF export
- Email reminders for expiring licenses
- Vehicle document management (uploads/attachments)
- Dark mode
- Advanced search/sort across all tables (basic search is MVP; full multi-column sort/filter is stretch)

---

## 7. Suggested Tech Stack (for the AI builder to default to, unless overridden)

- **Frontend:** React + Vite, Tailwind CSS, Recharts (for bar charts), React Router.
- **Backend:** Node.js + Express (or a single full-stack Next.js app if the builder prefers fewer moving parts).
- **Database:** PostgreSQL (relational integrity matters here — FKs, uniqueness, enums) via Prisma or Sequelize ORM. SQLite acceptable for a fast local MVP/demo.
- **Auth:** JWT-based session, bcrypt password hashing, role claim in token, middleware guarding both API routes and frontend routes.
- **State management:** React Query/TanStack Query for server state; minimal client state elsewhere.

---

## 8. Non-Functional Requirements

- All destructive/state-changing actions (dispatch, complete, cancel, maintenance create/close) must be atomic — vehicle/driver status updates and the triggering record update happen in one transaction, no partial states.
- Business rules (§4) are enforced in the API layer, not only the UI — the UI can pre-validate for UX, but the backend is the source of truth.
- Status badges use consistent color coding across all screens (Available/Completed = green, On Trip/Dispatched = blue, In Shop/Pending = orange, Retired/Suspended/Cancelled = red) matching the mockup.
- Loading and empty states for every table/list.

---

## 9. Acceptance Criteria (sample, expand per feature during build)

- [ ] Cannot register two vehicles with the same registration number (API returns 409/validation error).
- [ ] In Shop or Retired vehicles never appear in the Trip Dispatcher's vehicle dropdown.
- [ ] Suspended or license-expired drivers never appear in the Trip Dispatcher's driver dropdown.
- [ ] Attempting to dispatch a trip with cargo weight > vehicle capacity is blocked with a visible inline error.
- [ ] Dispatching a Draft trip flips both linked Vehicle and Driver to `On Trip` in the same request.
- [ ] Completing a trip flips both back to `Available`, updates vehicle odometer, and creates a fuel log if fuel consumed was entered.
- [ ] Creating a Maintenance record for a vehicle immediately removes it from the Trip Dispatcher pool.
- [ ] Dashboard KPIs update in real time (or on refresh) after any trip/vehicle/driver state change.
- [ ] CSV export on the Analytics page produces a valid file with current filtered data.
- [ ] A user with role `Dispatcher` cannot access `/settings` or `/fleet` edit routes even via direct URL.

---

## 10. Open Assumptions to Confirm

1. **Revenue** for ROI calculation isn't defined in the source doc — assuming either (a) a manual "Revenue" field entered on trip completion, or (b) a flat rate × distance. Recommend picking (a) for MVP simplicity, and flagging it in the UI as an editable field.
2. **Region** filter on the Dashboard — assuming a free-text or simple enum field on Vehicle (e.g. depot/region name), since it isn't defined elsewhere in the requirements.
3. Single depot per account is assumed for MVP (Settings has one Depot Name field); multi-depot is a possible future extension.

---

## 11. Suggested Enhancements (Stand-Out Features — Build After Core MVP)

These are not in the original problem statement or mockup. They extend existing entities/rules rather than introducing new infrastructure, so they're feasible to add once the MVP (§6) is working and validated. Prioritized by impact-to-effort ratio for an 8-hour build.

### 11.1 Smart Dispatch Assistant (Primary Differentiator)

**What it does:** When creating a trip, instead of just filtering vehicle/driver dropdowns to "available," the system ranks eligible vehicles and drivers and surfaces a recommended pairing before the user picks manually.

**Scoring logic (deterministic, no ML required):**

*Vehicle score — weighted combination of:*
- **Capacity fit**: penalize both oversized vehicles (wasted capacity) and vehicles too close to the cargo limit (little safety margin). Best fit scores highest.
- **Cost efficiency**: lower total operational cost per km ranks higher.
- **Wear balancing**: vehicles with lower recent odometer usage rank higher, to spread mileage across the fleet.

*Driver score — weighted combination of:*
- **Safety score** (direct weight, higher is better).
- **License expiry buffer**: drivers with licenses expiring soon are down-ranked even if still technically valid, to reduce near-term compliance risk.

**Output:** Top-ranked vehicle + driver shown as a highlighted "Suggested Match" card above the manual dropdowns, with a one-line human-readable reason (e.g. "Van-05 — 90% capacity fit · Alex — 96% safety score"). The dispatcher can accept the suggestion or override it manually; the suggestion never blocks manual selection.

**New endpoint:** `GET /trips/suggest?cargo_weight=&planned_distance=` — returns ranked vehicle/driver candidates.

**Effort:** ~1–1.5 hours (one scoring endpoint + one UI card). Build only after core dispatch/validation rules (§4, rules 2–8) are working and tested.

### 11.2 License-Expiry & Maintenance-Due Alerts

**What it does:** Dashboard surfaces proactive warnings without requiring email infrastructure (email reminders remain out of scope per §6):
- A red banner/badge showing count of driver licenses expiring within a configurable window (e.g. 7 days).
- An orange "Service Due Soon" tag on vehicles whose odometer has crossed a threshold since their last maintenance record.

**Why it's cheap:** Reuses data already captured on Driver (license_expiry_date) and Vehicle/MaintenanceLog (odometer, last service date) — no new entities needed.

**Effort:** ~30–40 minutes combined.

### 11.3 KPI Drill-Down

**What it does:** Dashboard KPI cards (Active Trips, Available Vehicles, etc.) become clickable, navigating to the relevant table pre-filtered to match that KPI (e.g. clicking "Active Trips" opens Trip Dispatcher filtered to Dispatched status).

**Why it matters:** Makes the dashboard feel interactive rather than a static summary.

**Effort:** ~30 minutes, assuming filter logic already exists on the target list views.

### 11.4 Rule-Triggered Notifications

**What it does:** A toast/notification appears in the top-right corner every time a business rule blocks an action or triggers an automatic state transition — e.g. "⚠ Capacity exceeded by 200 kg — dispatch blocked" or "✓ Van-05 automatically set to In Shop."

**Why it matters:** Makes rule enforcement visible in real time during a demo, instead of silent validation the audience has to be told about. Nearly free to build since the underlying validation/transition logic already exists — this only adds a UI notification layer on top of it.

**Effort:** ~15–20 minutes.

### 11.5 Priority Order If Time Runs Short

If time is constrained, build in this order and stop wherever the clock runs out — each item is independently valuable and does not depend on the ones after it:

1. Core MVP (§6) — non-negotiable, this is what's graded against the acceptance criteria (§9).
2. Smart Dispatch Assistant (§11.1) — primary differentiator.
3. Rule-Triggered Notifications (§11.4) — cheapest way to make existing rules demo-visible.
4. License-Expiry & Maintenance-Due Alerts (§11.2).
5. KPI Drill-Down (§11.3).

PDF export, dark mode, document management, and full multi-column sort/filter remain lowest priority — they were already flagged as bonus/out-of-scope in §6 and do not meaningfully affect judging outcomes relative to the items above.
