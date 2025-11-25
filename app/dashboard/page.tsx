"use client"

import { motion } from "framer-motion"
import { StatsDashboard } from "@/components/stats-dashboard"
import { AnalysisHistory } from "@/components/analysis-history"

export default function Dashboard() {
  const metrics = [
    { label: "F1-Score", value: "0.9963", color: "cyan" },
    { label: "ROC-AUC", value: "0.9981", color: "purple" },
    { label: "Recall", value: "99.88%", color: "pink" },
    { label: "Precision", value: "99.40%", color: "green" },
  ]

  const modelInfo = [
    { label: "Algoritmo", value: "LightGBM" },
    { label: "Precisión", value: "99.5%" },
    { label: "Características", value: "19" },
    { label: "Entrenado", value: "450K URLs" },
  ]

  const alerts = [
    { type: "danger", icon: "⛔", text: "5 URLs de phishing detectadas en la última hora" },
    { type: "warning", icon: "⚠️", text: "2 dominios sospechosos en cuarentena" },
    { type: "success", icon: "✅", text: "Sistema funcionando óptimamente" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur sticky top-16 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1
            className="text-4xl font-bold gradient-text mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Panel de Control
          </motion.h1>
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Monitorea el desempeño del sistema y accede a reportes detallados
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Estadísticas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Resumen General</h2>
          <StatsDashboard />
        </motion.div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Historial */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnalysisHistory refreshTrigger={0} />
          </motion.div>

          {/* Barra Lateral */}
          <div className="space-y-6">
            {/* Métricas Avanzadas */}
            <motion.div
              className="glass-card border border-cyan-500/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                <span>📊</span> Métricas Avanzadas
              </h3>
              <div className="space-y-3">
                {metrics.map((metric, i) => (
                  <motion.div key={i} className="flex justify-between items-center" whileHover={{ x: 5 }}>
                    <span className="text-slate-400 text-sm">{metric.label}</span>
                    <motion.span
                      className={`text-${metric.color}-400 font-bold`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.3 + i * 0.1 }}
                    >
                      {metric.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Información del Modelo */}
            <motion.div
              className="glass-card border border-purple-500/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                <span>⚙️</span> Información del Modelo
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                {modelInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between py-1 border-b border-slate-700/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <span className="text-slate-400">{info.label}</span>
                    <span className="text-cyan-300 font-semibold">{info.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Alertas de Seguridad */}
            <motion.div
              className="glass-card border border-red-500/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                <span>🚨</span> Alertas Recientes
              </h3>
              <div className="space-y-2">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    className={`p-3 rounded-lg border-l-4 text-xs backdrop-blur ${
                      alert.type === "danger"
                        ? "bg-red-500/10 border-l-red-500 text-red-300"
                        : alert.type === "warning"
                          ? "bg-yellow-500/10 border-l-yellow-500 text-yellow-300"
                          : "bg-green-500/10 border-l-green-500 text-green-300"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ x: 3 }}
                  >
                    <span className="text-lg mr-2">{alert.icon}</span>
                    {alert.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
