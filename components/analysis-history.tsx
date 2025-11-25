"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnalysisItem {
  url: string
  is_phishing: boolean
  confidence: number
  timestamp: string
}

interface AnalysisHistoryProps {
  refreshTrigger?: number
}

export function AnalysisHistory({ refreshTrigger }: AnalysisHistoryProps) {
  const [history, setHistory] = useState<AnalysisItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [refreshTrigger])

  const loadHistory = () => {
    setLoading(true)
    try {
      const saved = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      setHistory(saved.slice(0, 20))
    } catch (error) {
      console.error("Error loading history:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    if (confirm("¿Deseas limpiar el historial?")) {
      localStorage.removeItem("analysisHistory")
      setHistory([])
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <motion.div
      className="glass-card border border-cyan-500/30 p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="text-2xl font-bold text-white flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
            🔄
          </motion.span>
          Análisis Recientes
        </motion.h2>
        {history.length > 0 && (
          <motion.button
            onClick={clearHistory}
            className="btn-ghost text-xs px-3 py-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🗑️ Limpiar
          </motion.button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 flex-1">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <span className="text-4xl">⚙️</span>
          </motion.div>
        </div>
      ) : history.length === 0 ? (
        <motion.div
          className="flex items-center justify-center py-12 flex-1 text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-center">Sin análisis aún. Comienza arriba 👆</p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-3 overflow-y-auto flex-1 max-h-96"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {history.map((item, idx) => (
              <motion.div
                key={`${item.url}-${idx}`}
                variants={itemVariants}
                exit="exit"
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-lg border-l-4 transition-all backdrop-blur cursor-pointer group ${
                  item.is_phishing
                    ? "bg-red-500/10 border-l-red-500 hover:bg-red-500/20"
                    : "bg-green-500/10 border-l-green-500 hover:bg-green-500/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {item.is_phishing ? "⛔" : "✅"}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-slate-200 truncate hover:text-clip">{item.url}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={`text-xs font-semibold uppercase ${
                          item.is_phishing ? "text-red-300" : "text-green-300"
                        }`}
                      >
                        {item.is_phishing ? "Phishing" : "Legítimo"}
                      </p>
                      <p className="text-xs text-slate-400">{(item.confidence * 100).toFixed(1)}% confianza</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{new Date(item.timestamp).toLocaleString("es-ES")}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}
