"use client";

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Trip Management</h1>
        <p className="mt-2 text-lg text-zinc-600">Dispatch and track all fleet operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Trip Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Trips (Month)</span>
              <span className="text-sm font-medium text-zinc-900">1,247</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Completed</span>
              <span className="text-sm font-medium text-green-600">98%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Average Distance</span>
              <span className="text-sm font-medium text-zinc-900">125 km</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Route Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Active Routes</span>
              <span className="text-sm font-medium text-zinc-900">24</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Vehicles in Use</span>
              <span className="text-sm font-medium text-blue-600">13/20</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Drivers Assigned</span>
              <span className="text-sm font-medium text-purple-600">42</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Recent Dispatches</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-zinc-600">TR003 dispatched - Van to East Yard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm text-zinc-600">TR004 cancelled - Truck to Depot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}