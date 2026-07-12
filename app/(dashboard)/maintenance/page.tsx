"use client";

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Maintenance Management</h1>
        <p className="mt-2 text-lg text-zinc-600">Vehicle service logs and maintenance tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Active Maintenance</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-zinc-900">MIN-01 - Oil Change</p>
                <p className="text-xs text-zinc-500">Due tomorrow</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-zinc-900">TRCK-12 - Tyre Replacement</p>
                <p className="text-xs text-zinc-500">Completed 2 weeks ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">COMPLETED</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Service History</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Services</span>
              <span className="text-sm font-medium text-zinc-900">48</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">This Month</span>
              <span className="text-sm font-medium text-zinc-900">8</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Cost</span>
              <span className="text-sm font-medium text-zinc-900">$12,450</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">Upcoming Maintenance</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm text-zinc-600">MIN-01 - Oil Change (Tomorrow)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm text-zinc-600">VAN-09 - Tire Rotation (3 days)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-sm text-zinc-600">TRCK-12 - Service Check (1 week)</span>
          </div>
        </div>
      </div>
    </div>
  );
}