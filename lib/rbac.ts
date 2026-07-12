import { UserRole } from "@prisma/client";

export const MODULES = {
  dashboard: "dashboard",
  fleet: "fleet",
  drivers: "drivers",
  trips: "trips",
  maintenance: "maintenance",
  fuelExpenses: "fuelExpenses",
  analytics: "analytics",
  settings: "settings",
} as const;

export type ModuleKey = (typeof MODULES)[keyof typeof MODULES];

export const ROLE_MODULE_ACCESS: Record<UserRole, ModuleKey[]> = {
  FLEET_MANAGER: [
    "dashboard",
    "fleet",
    "maintenance",
    "analytics",
    "settings",
  ],
  DISPATCHER: ["dashboard", "trips"],
  SAFETY_OFFICER: ["dashboard", "drivers"],
  FINANCIAL_ANALYST: ["dashboard", "fuelExpenses", "analytics"],
};

export function canAccessModule(role: UserRole, moduleKey: ModuleKey): boolean {
  return ROLE_MODULE_ACCESS[role]?.includes(moduleKey) ?? false;
}

export const ROUTE_MODULE_MAP: { prefix: string; module: ModuleKey }[] = [
  { prefix: "/dashboard", module: "dashboard" },
  { prefix: "/fleet", module: "fleet" },
  { prefix: "/drivers", module: "drivers" },
  { prefix: "/trips", module: "trips" },
  { prefix: "/maintenance", module: "maintenance" },
  { prefix: "/fuel-expenses", module: "fuelExpenses" },
  { prefix: "/analytics", module: "analytics" },
  { prefix: "/settings", module: "settings" },
];

export function moduleForPath(pathname: string): ModuleKey | null {
  const match = ROUTE_MODULE_MAP.find((r) => pathname.startsWith(r.prefix));
  return match ? match.module : null;
}
