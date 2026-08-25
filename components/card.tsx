export default function WorkerCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center text-xl font-bold text-slate-700">
            JD
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              John Doe
            </h2>

            <p className="text-slate-500 text-sm">
              EMP-042 · Sector B, Floor 2
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>

              <span className="text-green-600 font-medium text-sm">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="px-5 py-2 rounded-full border border-orange-300 bg-orange-50 text-orange-700 font-semibold flex items-center gap-2">
          🚶 WALKING
        </div>
      </div>
    </div>
  );
}