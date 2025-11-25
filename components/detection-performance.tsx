"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"

export function DetectionPerformance() {
  const [performance, setPerformance] = useState({
    avgResponseTime: "0ms",
    accuracy: "99.5%",
    detectionRate: "99.3%",
    falsePositiveRate: "0.7%",
  })

  useEffect(() => {
    // Simulate performance metrics
    setPerformance({
      avgResponseTime: `${(Math.random() * 500 + 100) | 0}ms`,
      accuracy: `${(98 + Math.random() * 1.5).toFixed(1)}%`,
      detectionRate: `${(98 + Math.random() * 1.5).toFixed(1)}%`,
      falsePositiveRate: `${(Math.random() * 1.5).toFixed(1)}%`,
    })
  }, [])

  const metrics = [
    {
      label: "Avg Response Time",
      value: performance.avgResponseTime,
      icon: Zap,
      color: "cyan",
      trend: "down",
    },
    {
      label: "Model Accuracy",
      value: performance.accuracy,
      icon: TrendingUp,
      color: "green",
      trend: "up",
    },
    {
      label: "Detection Rate",
      value: performance.detectionRate,
      icon: TrendingUp,
      color: "blue",
      trend: "up",
    },
    {
      label: "False Positive Rate",
      value: performance.falsePositiveRate,
      icon: TrendingDown,
      color: "orange",
      trend: "down",
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white uppercase">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          const colorClasses = {
            cyan: "text-cyan-400",
            green: "text-green-400",
            blue: "text-blue-400",
            orange: "text-orange-400",
          }[metric.color as keyof typeof colorClasses]

          return (
            <Card key={idx} className="bg-slate-800 border-slate-700 p-3 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${colorClasses}`} />
                <span className={`text-xs font-semibold ${metric.trend === "up" ? "text-green-400" : "text-blue-400"}`}>
                  {metric.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{metric.label}</p>
              <p className="text-sm font-bold text-white mt-1">{metric.value}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
