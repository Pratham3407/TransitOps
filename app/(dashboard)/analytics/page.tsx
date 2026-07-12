"use client";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Analytics & Reporting</h1>
        <p className="mt-2 text-lg text-zinc-600">Fleet performance metrics and operational insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Fuel Consumption</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Liters (Month)</span>
              <span className="text-sm font-medium text-zinc-900">3,245 L</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Cost (Month)</span>
              <span className="text-sm font-medium text-zinc-900">$5,860</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Average Cost/Liter</span>
              <span className="text-sm font-medium text-zinc-900">$1.80</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Driver Safety Scores</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Average Safety Score</span>
              <span className="text-sm font-medium text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">High Performers &gt;90%</span>
              <span className="text-sm font-medium text-zinc-900">32 drivers</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Average Response Time</span>
              <span className="text-sm font-medium text-zinc-900">2.3 minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">Vehicle Utilization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">68%</div>
            <div className="text-xs text-zinc-500 mt-1"> utilization</div>
          </div>
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-xs text-zinc-500 mt-1">Efficiency</div>
          </div>
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-xs text-zinc-500 mt-1">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}