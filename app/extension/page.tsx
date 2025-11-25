"use client"

import { motion } from "framer-motion"
import { Chrome, Download, Shield, Zap, Lock, Eye } from "lucide-react"

export default function ExtensionPage() {
  const features = [
    {
      icon: Shield,
      title: "Protección en Tiempo Real",
      description: "Analiza automáticamente cada URL antes de visitarla",
    },
    {
      icon: Zap,
      title: "Ultra Rápido",
      description: "Verificación instantánea sin ralentizar tu navegación",
    },
    {
      icon: Lock,
      title: "Privacidad Total",
      description: "No guardamos tu historial de navegación",
    },
    {
      icon: Eye,
      title: "Indicador Visual",
      description: "Alertas claras sobre sitios sospechosos",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-6xl">🧩</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Extensión del Navegador</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Protección contra phishing integrada directamente en tu navegador. Navega seguro con CyberSentinel.
            </p>

            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-yellow-400">⚠️</span>
              <span className="text-yellow-300 text-sm font-medium">Próximamente en Chrome Web Store y Firefox Add-ons</span>
            </motion.div>
          </div>

          {/* Preview Section */}
          <motion.div
            className="glass-card p-8 border-2 border-cyan-500/30 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">¿Cómo Funciona?</h2>
              <p className="text-slate-400">
                La extensión analiza cada URL en tiempo real utilizando nuestra API de detección de phishing
              </p>
            </div>

            {/* Mock Extension UI */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">CyberSentinel</h3>
                  <p className="text-xs text-slate-400">Protección Activa</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-sm text-slate-300">Sitio Seguro</span>
                  </div>
                  <span className="text-xs text-slate-500">99.8%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">🔍</span>
                    <span className="text-sm text-slate-400">1,247 URLs analizadas</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">⚠</span>
                    <span className="text-sm text-slate-300">15 amenazas bloqueadas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-6 border border-slate-700"
                whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.5)" }}
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Download Section */}
          <motion.div
            className="glass-card p-8 border-2 border-purple-500/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Instalar Extensión</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              La extensión estará disponible pronto. Mientras tanto, puedes usar nuestra web app o consultar el código
              fuente en GitHub.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <motion.a
                href="https://github.com/Dxnn017/CyberSentinel-Extension"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow py-4 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chrome className="w-5 h-5" />
                Ver Código en GitHub
              </motion.a>

              <motion.a
                href="/"
                className="btn-ghost py-4 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Usar Web App
              </motion.a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Chrome className="w-4 h-4" />
                <span>Chrome</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.11 19.417c-4.12 0-7.478-3.353-7.478-7.477 0-4.12 3.358-7.477 7.478-7.477 4.12 0 7.477 3.357 7.477 7.477 0 4.124-3.357 7.477-7.477 7.477z" />
                </svg>
                <span>Firefox</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                <span>Edge</span>
              </div>
            </div>
          </motion.div>

          {/* Notify Me Section */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-slate-400 mb-4">¿Quieres ser notificado cuando se lance?</p>
            <motion.a
              href="/support"
              className="text-cyan-400 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Contáctanos y te avisaremos →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
