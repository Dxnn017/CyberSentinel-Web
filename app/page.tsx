"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { URLAnalyzerCard } from "@/components/url-analyzer-card"
import { StatsDashboard } from "@/components/stats-dashboard"
import { AnalysisHistory } from "@/components/analysis-history"
import { SecurityTips } from "@/components/security-tips"

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleNewAnalysis = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Grid de fondo animado */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <URLAnalyzerCard onAnalysisComplete={handleNewAnalysis} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Estadísticas del Sistema</h2>
            <StatsDashboard />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AnalysisHistory refreshTrigger={refreshTrigger} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SecurityTips />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
