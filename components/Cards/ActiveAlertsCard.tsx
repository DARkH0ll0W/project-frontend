import { ShieldCheck } from "lucide-react";

export default function ActiveAlerts({
  status = "safe",
  title = "No Hazards Detected",
  message = "All readings within safe limits",
}) {
  const safe = status === "safe";

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200">
      <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
        Active Alerts
      </h3>

      <div
        className={`rounded-xl p-6 border text-center ${
          safe
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <ShieldCheck
          className={`mx-auto mb-3 ${
            safe ? "text-green-600" : "text-red-600"
          }`}
          size={36}
        />

        <h4
          className={`font-semibold text-lg ${
            safe ? "text-green-700" : "text-red-700"
          }`}
        >
          {title}
        </h4>

        <p
          className={`mt-1 text-sm ${
            safe ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}