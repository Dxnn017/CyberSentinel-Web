"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface AnalysisResult {
  url: string
  prediction: string
  confidence: number
  score: number
  status: string
  timestamp: string
  features: any
}

export function URLAnalyzer() {
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

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) throw new Error("Análisis fallido")

      const apiData = await response.json()
      
      // Convertir respuesta de la API al formato esperado
      const data = {
        url: url.trim(),
        prediction: apiData.is_phishing ? "phishing" : "legitimate",
        confidence: Math.round(apiData.confidence * 100),
        score: apiData.risk_score,
        status: apiData.is_phishing ? "dangerous" : "safe",
        timestamp: new Date().toISOString(),
        features: apiData.features
      }
      
      setResult(data)

      // Guardar en historial local
      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      history.unshift(data)
      localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al analizar la URL")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={analyzeURL} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Ingresa una URL (ej: https://ejemplo.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 h-12 text-base"
          />
          <Button type="submit" disabled={loading} className="btn-primary px-8 h-12 text-base font-semibold">
            {loading ? "Analizando..." : "Analizar"}
          </Button>
        </div>
      </form>

      {error && (
        <Card className="bg-red-950 bg-opacity-40 border border-red-700 border-l-4 border-l-red-500 p-4 rounded-xl">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </Card>
      )}

      {result && (
        <Card
          className={`p-8 border-2 rounded-xl animate-slideInDown backdrop-blur transition-all ${
            result.status === "dangerous"
              ? "border-red-500 bg-red-950 bg-opacity-40"
              : "border-green-500 bg-green-950 bg-opacity-40"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">{result.status === "dangerous" ? "⛔" : "✅"}</div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-2xl font-bold ${result.status === "dangerous" ? "text-red-300" : "text-green-300"}`}
                >
                  {result.status === "dangerous" ? "Phishing Detectado" : "Sitio Legítimo"}
                </h3>
                <p className="text-sm text-slate-300 mt-2 break-all font-mono">{result.url}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700">
              <div className="rounded-xl border border-cyan-500 bg-cyan-950 bg-opacity-30 backdrop-blur p-4">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Confianza</p>
                <p className="text-3xl font-bold text-cyan-400">{result.confidence}%</p>
              </div>
              <div className="rounded-xl border border-amber-500 bg-amber-950 bg-opacity-30 backdrop-blur p-4">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Puntuación de Riesgo</p>
                <p className="text-3xl font-bold text-amber-400">{(result.score * 100).toFixed(1)}%</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Analizado el</p>
              <p className="text-sm text-slate-300">{new Date(result.timestamp).toLocaleString("es-ES")}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
