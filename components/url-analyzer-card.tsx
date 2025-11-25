"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnalysisResult {
  is_phishing: boolean
  confidence: number
  risk_level: string
  risk_score: number
  features: Record<string, any>
  timestamp: string
}

interface URLAnalyzerCardProps {
  onAnalysisComplete?: () => void
}

export function URLAnalyzerCard({ onAnalysisComplete }: URLAnalyzerCardProps) {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeURL = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("Por favor ingresa una URL válida")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) throw new Error("Análisis fallido")

      const data = await response.json()
      setResult({
        ...data,
        timestamp: new Date().toISOString(),
      })

      onAnalysisComplete?.()

      // Guardar en historial local
      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      history.unshift({ url: url.trim(), ...data, timestamp: new Date().toISOString() })
      localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al analizar la URL")
    } finally {
      setLoading(false)
    }
  }

  const riskColor = result?.is_phishing ? "red" : "green"
  const riskText = result?.is_phishing ? "PHISHING DETECTADO" : "SITIO LEGÍTIMO"

  return (
    <motion.div
      className="glass-card p-8 border-2 border-cyan-500/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={analyzeURL} className="space-y-6">
        {/* Input */}
        <div className="relative group">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <input
            type="url"
            placeholder="Ingresa una URL (ej: https://ejemplo.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="input-glow relative w-full"
          />
        </div>

        {/* Botón */}
        <motion.button
          type="submit"
          disabled={loading}
          className="btn-glow w-full disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <motion.span
              className="inline-flex items-center gap-2"
              animate={{ opacity: [1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, linear: true }}
              >
                ⚙️
              </motion.span>
              Analizando...
            </motion.span>
          ) : (
            "Analizar URL"
          )}
        </motion.button>
      </form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-6 p-4 rounded-xl border-l-4 border-l-red-500 bg-red-500/10 border border-red-500/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-red-300 text-sm">⚠️ {error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultado */}
      <AnimatePresence>
        {result && (
          <motion.div
            className={`mt-8 p-8 rounded-xl border-2 glass-card ${
              result.is_phishing ? "border-red-500/50 bg-red-500/5" : "border-green-500/50 bg-green-500/5"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                className="flex items-start gap-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="text-6xl flex-shrink-0"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {result.is_phishing ? "⛔" : "✅"}
                </motion.div>
                <div className="flex-1">
                  <motion.h3 className={`text-2xl font-bold ${result.is_phishing ? "text-red-300" : "text-green-300"}`}>
                    {riskText}
                  </motion.h3>
                  <p className="text-sm text-slate-300 mt-2 break-all font-mono">{result.features?.url || url}</p>
                </div>
              </motion.div>

              {/* Métricas */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, staggerChildren: 0.1 }}
              >
                {[
                  { label: "Confianza", value: `${(result.confidence * 100).toFixed(1)}%`, color: "cyan" },
                  { label: "Nivel Riesgo", value: result.risk_level, color: "amber" },
                  { label: "Puntuación", value: (result.risk_score * 100).toFixed(1) + "%", color: "purple" },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    className={`glass-card p-4 border border-${metric.color}-500/30 bg-${metric.color}-500/5`}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <p className={`text-xs text-${metric.color}-300 uppercase font-semibold mb-2`}>{metric.label}</p>
                    <motion.p
                      className={`text-2xl font-bold text-${metric.color}-400`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {metric.value}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Detalles */}
              <motion.div
                className="pt-4 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Analizado el {new Date(result.timestamp).toLocaleString("es-ES")}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
