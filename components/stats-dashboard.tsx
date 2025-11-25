"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Stats {
  total_analyzed: number
  phishing_detected: number
  legitimate: number
  detection_rate: number
  avg_confidence: number
}

export function StatsDashboard() {
  const [stats, setStats] = useState<Stats>({
    total_analyzed: 0,
    phishing_detected: 0,
    legitimate: 0,
    detection_rate: 0,
    avg_confidence: 0,
  })

  useEffect(() => {
    // Cargar de localStorage
    const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
    const phishing = history.filter((item: any) => item.is_phishing).length
    const legitimate = history.filter((item: any) => !item.is_phishing).length
    const total = history.length

    setStats({
      total_analyzed: total,
      phishing_detected: phishing,
      legitimate: legitimate,
      detection_rate: total > 0 ? (phishing / total) * 100 : 0,
      avg_confidence:
        total > 0 ? (history.reduce((sum: number, item: any) => sum + (item.confidence || 0), 0) / total) * 100 : 0,
    })
  }, [])

  const statItems = [
    {
      icon: "📊",
      label: "Total Analizadas",
      value: stats.total_analyzed,
      color: "cyan",
      trend: "+12%",
    },
    {
      icon: "⛔",
      label: "Phishing Detectados",
      value: stats.phishing_detected,
      color: "red",
      trend: "+8%",
    },
    {
      icon: "✅",
      label: "Sitios Legítimos",
      value: stats.legitimate,
      color: "green",
      trend: "+15%",
    },
    {
      icon: "🎯",
      label: "Tasa Detección",
      value: stats.detection_rate.toFixed(1) + "%",
      color: "purple",
      trend: "99.5%",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statItems.map((item, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass-card p-6 cursor-pointer group"
        >
          <motion.div
            className="text-4xl mb-3 group-hover:scale-125 transition-transform origin-left"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            {item.icon}
          </motion.div>

          <p className="text-sm text-slate-400 font-semibold uppercase mb-2">{item.label}</p>

          <motion.p
            className={`text-3xl font-bold text-${item.color}-400`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {typeof item.value === "number" && item.value > 100 ? item.value.toLocaleString("es-ES") : item.value}
          </motion.p>

          <motion.p
            className={`text-xs text-${item.color}-300 mt-2 font-semibold`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.trend}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  )
}
