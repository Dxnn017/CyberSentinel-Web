"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Activity, Activity as Activity2 } from "lucide-react"

interface RecentAnalysis {
  url: string
  result: "safe" | "dangerous"
  time: string
}

export function RealTimeMonitor() {
  const [analyses, setAnalyses] = useState<RecentAnalysis[]>([])

  useEffect(() => {
    const checkForNewAnalyses = async () => {
      try {
        const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
        const data = { results: history }

        const recent = (data.results || []).slice(0, 5).map((item: any) => ({
          url: item.url.substring(0, 30) + (item.url.length > 30 ? "..." : ""),
          result: item.prediction === "phishing" ? "dangerous" : "safe",
          time: new Date(item.timestamp).toLocaleTimeString(),
        }))

        setAnalyses(recent)
      } catch (error) {
        console.error("Failed to check analyses:", error)
      }
    }

    checkForNewAnalyses()
    const interval = setInterval(checkForNewAnalyses, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900 border-slate-700 p-6">
      <h3 className="font-semibold text-white text-sm uppercase mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
        Live Activity
      </h3>

      {analyses.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          <Activity2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {analyses.map((analysis, idx) => (
            <div
              key={idx}
              className={`p-3 rounded text-xs border-l-2 ${
                analysis.result === "dangerous"
                  ? "bg-red-950 border-l-red-500 text-red-100"
                  : "bg-green-950 border-l-green-500 text-green-100"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-mono truncate">{analysis.url}</span>
                <span className="text-slate-400 flex-shrink-0 ml-2">{analysis.time}</span>
              </div>
              <div className="text-xs opacity-75 mt-1">
                {analysis.result === "dangerous" ? "Phishing Detected" : "Legitimate"}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
