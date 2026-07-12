"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">TransitOps Dashboard</h1>
        <p className="mt-2 text-lg text-zinc-600">Smart Transport Operations Platform - Fleet Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Total Vehicles</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">20</p>
          <p className="mt-1 text-sm text-zinc-500">5 Available, 13 On Trip</p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Active Drivers</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">45</p>
          <p className="mt-1 text-sm text-zinc-500">42 Available, 3 On Trip</p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Today&apos;s Trips</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">12</p>
          <p className="mt-1 text-sm text-zinc-500">3 Dispatched, 9 Completed</p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">Fuel Cost Today</h3>
          <p className="mt-2 text-3xl font-bold text-amber-600">$285</p>
          <p className="mt-1 text-sm text-zinc-500">~$12.50 per vehicle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-zinc-600">Trip TR003 dispatched - Van VAN-09 to East Yard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm text-zinc-600">Driver Alex Morgan added to system</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-sm text-zinc-600">Driver Megan Blake suspended - License compliance</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-sm text-zinc-600">Vehicle MIN-01 in shop - Oil change due</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Critical Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-rose-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-zinc-900">License Expiry</p>
                <p className="text-xs text-zinc-500">Carlos Reyes - License expires Jan 15, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-orange-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-zinc-900">Capacity Warning</p>
                <p className="text-xs text-zinc-500">Vehicle TRK-12 at 95% capacity utilization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-1" />
                <div>
                <p className="text-sm font-medium text-zinc-900">Vehicle Maintenance</p>
                <p className="text-xs text-zinc-500">MIN-01 scheduled for oil change tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm bg-zinc-50 hover:bg-zinc-100 rounded transition-colors">
              + Add Driver
            </button>
            <button className="w-full text-left px-3 py-2 text-sm bg-zinc-50 hover:bg-zinc-100 rounded transition-colors">
              + Register Vehicle
            </button>
            <button className="w-full text-left px-3 py-2 text-sm bg-zinc-50 hover:bg-zinc-100 rounded transition-colors">
              + Create Trip
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">System Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Database</span>
              <span className="text-green-600">Connected</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">API Server</span>
              <span className="text-green-600">Operational</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Auth Service</span>
              <span className="text-green-600">Secure</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Rule Engine</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-3">Role Access</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Fleet Manager</span>
              <span className="text-zinc-900">Full Access</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Dispatcher</span>
              <span className="text-zinc-900">Trip Management</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Safety Officer</span>
              <span className="text-zinc-900">Driver Records</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Financial Analyst</span>
              <span className="text-zinc-900">Financial Reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}