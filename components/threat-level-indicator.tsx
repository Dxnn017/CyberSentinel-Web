"use client"

interface ThreatLevelIndicatorProps {
  score: number
  confidence: number
}

export function ThreatLevelIndicator({ score, confidence }: ThreatLevelIndicatorProps) {
  const threatLevel = score > 0.7 ? "critical" : score > 0.5 ? "high" : score > 0.3 ? "medium" : "low"

  const levels = {
    critical: { color: "from-red-600 to-red-700", label: "Critical", icon: "●●●●●" },
    high: { color: "from-orange-600 to-orange-700", label: "High", icon: "●●●●○" },
    medium: { color: "from-yellow-600 to-yellow-700", label: "Medium", icon: "●●●○○" },
    low: { color: "from-green-600 to-green-700", label: "Low", icon: "●○○○○" },
  }

  const level = levels[threatLevel as keyof typeof levels]

  return (
    <div className={`bg-gradient-to-r ${level.color} rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white uppercase opacity-80">Threat Level</p>
          <p className="text-lg font-bold text-white mt-1">{level.label}</p>
        </div>
        <div className="text-3xl text-white opacity-50">{level.icon}</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white opacity-90">
        <span>Risk: {(score * 100).toFixed(1)}%</span>
        <span>Confidence: {confidence}%</span>
      </div>
    </div>
  )
}
