"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">System Settings</h1>
        <p className="mt-2 text-lg text-zinc-600">Configure depot and system parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Depot Configuration</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Depot Name</span>
              <span className="text-sm font-medium text-zinc-900">Central Depot</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Currency</span>
              <span className="text-sm font-medium text-zinc-900">USD</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-600">Distance Unit</span>
              <span className="text-sm font-medium text-zinc-900">km</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Role Permissions</h2>
          <div className="space-y-3">
            <div className="p-3 bg-zinc-50 rounded-lg">
              <p className="text-sm font-medium text-zinc-900">Fleet Manager</p>
              <p className="text-xs text-zinc-500 mt-1">Full fleet access rights</p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg">
              <p className="text-sm font-medium text-zinc-900">Dispatcher</p>
              <p className="text-xs text-zinc-500 mt-1">Trip management only</p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg">
              <p className="text-sm font-medium text-zinc-900">Safety Officer</p>
              <p className="text-xs text-zinc-500 mt-1">Driver records management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-sm text-zinc-500">Version</div>
            <div className="text-lg font-bold text-zinc-900">v1.0.0</div>
          </div>
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-sm text-zinc-500">Database</div>
            <div className="text-lg font-bold text-green-600">Connected</div>
          </div>
          <div className="text-center p-4 bg-zinc-50 rounded-lg">
            <div className="text-sm text-zinc-500">Last Backup</div>
            <div className="text-lg font-bold text-zinc-900">2 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}