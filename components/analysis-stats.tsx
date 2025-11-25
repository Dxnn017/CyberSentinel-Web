"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface Stats {
  total: number
  phishing: number
  legitimate: number
  avgConfidence: number
  phishingRate: number
}

export function AnalysisStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    phishing: 0,
    legitimate: 0,
    avgConfidence: 0,
    phishingRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
        
        const total = history.length
        const phishing = history.filter((item: any) => item.prediction === "phishing").length
        const legitimate = total - phishing
        const avgConfidence = total > 0 
          ? Math.round(history.reduce((sum: number, item: any) => sum + (item.confidence || 0), 0) / total)
          : 0
        const phishingRate = total > 0 ? Math.round((phishing / total) * 100) : 0

        setStats({
          total,
          phishing,
          legitimate,
          avgConfidence,
          phishingRate
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      label: "Total Analizadas",
      value: stats.total,
      icon: "📊",
      bgClass: "from-cyan-600 to-blue-600",
      borderClass: "border-cyan-500",
    },
    {
      label: "Sitios Legítimos",
      value: stats.legitimate,
      icon: "✅",
      bgClass: "from-green-600 to-emerald-600",
      borderClass: "border-green-500",
    },
    {
      label: "Phishing Detectado",
      value: stats.phishing,
      icon: "⛔",
      bgClass: "from-red-600 to-pink-600",
      borderClass: "border-red-500",
    },
    {
      label: "Confianza Promedio",
      value: `${stats.avgConfidence}%`,
      icon: "📈",
      bgClass: "from-purple-600 to-indigo-600",
      borderClass: "border-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, idx) => (
        <Card
          key={idx}
          className={`bg-gradient-to-br ${stat.bgClass} bg-opacity-10 border-2 ${stat.borderClass} p-6 hover:shadow-lg hover:shadow-current hover:translate-y-[-4px] transition-all duration-300 rounded-xl backdrop-blur cursor-pointer`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-3">{loading ? "-" : stat.value}</p>
            </div>
            <span className="text-3xl opacity-70">{stat.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
