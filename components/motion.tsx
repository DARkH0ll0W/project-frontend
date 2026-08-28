interface MotionProps {
  // Updated to match the backend's simplified two-class MOTION_CHOICES
  // (normal / fall_detected) — the old idle/walking/falling values no
  // longer exist, so a check against "walking"/"falling" here would never
  // match and Activity would silently always show "Standing".
  motionStatus: "normal" | "fall_detected";
  // Air Quality is derived from MQ-135 specifically (CO2/VOC-type air
  // quality sensor), not the composite gas_status used for Gas Level —
  // MQ-135 and MQ-2 are genuinely different physical sensors, so this
  // gives two distinct signals instead of showing the same value twice.
  mq135Normalized: number | null;
}

const getAirQualityStatus = (mq135Normalized: number | null) => {
  if (mq135Normalized === null) {
    return { label: "Unavailable", color: "#94A3B8" };
  }

  if (mq135Normalized >= 1.8) {
    return { label: "Warning", color: "#EF4444" };
  }

  return { label: "Good", color: "#22C55E" };
};

const getMotionStatus = (motion: "normal" | "fall_detected") => {
  if (motion === "fall_detected") {
    return { label: "Fall Detected", color: "#DC2626", emoji: "🚨" };
  }
  return { label: "Normal", color: "#22C55E", emoji: "🧍" };
};

export default function MotionCard({
  motionStatus,
  mq135Normalized,
}: MotionProps) {
  const airQuality = getAirQualityStatus(mq135Normalized);
  const motion = getMotionStatus(motionStatus);

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="rounded-xl border border-slate-700 p-4 flex flex-col justify-center">
        <p className="text-slate-400 text-sm">Air Quality</p>
        <h3 className="text-lg font-semibold" style={{ color: airQuality.color }}>
          {airQuality.label}
        </h3>
      </div>

      <div className="rounded-xl border border-slate-700 p-4 flex flex-col justify-center">
        <p className="text-slate-400 text-sm">Activity</p>
        <h3 className="text-lg font-semibold" style={{ color: motion.color }}>
          {motion.emoji} {motion.label}
        </h3>
      </div>
    </div>
  );
}
