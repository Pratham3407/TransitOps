"use client";

export default function FuelExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Fuel Expenses</h1>
        <p className="mt-2 text-lg text-zinc-600">Track and analyze fuel consumption and costs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Fuel Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Total Fuel (Month)</span>
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
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Vehicle Efficiency</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Most Efficient</span>
              <span className="text-sm font-medium text-green-600">VAN-09 (15.2 L/100km)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Highest Cost</span>
              <span className="text-sm font-medium text-red-600">TRCK-12 ($890)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Fuel per Trip</span>
              <span className="text-sm font-medium text-zinc-900">60 L average</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Recent Refills</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900">TRCK-12</p>
                <p className="text-xs text-zinc-500">2 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-900">60 L</p>
                <p className="text-xs text-zinc-500">$90.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900">VAN-05</p>
                <p className="text-xs text-zinc-500">5 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-900">35 L</p>
                <p className="text-xs text-zinc-500">$52.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">Fuel Cost Breakdown</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-zinc-600">TRCK-12 - Truck fuel consumption (highest volume)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm text-zinc-600">VAN-05 - Van fuel usage (regular operations)</span>
          </div>
        </div>
      </div>
    </div>
  );
}