"use client"

import { motion } from "framer-motion"

export default function Documentation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  const apiExample = `{
  "url": "https://ejemplo.com",
  "is_phishing": false,
  "confidence": 0.995,
  "risk_level": "baixo",
  "risk_score": 0.005,
  "features": {
    "url_length": 25,
    "num_subdomains": 1,
    "has_at_symbol": false,
    "has_https": true
  }
}`

  const bestPractices = [
    {
      icon: "👁️",
      title: "Verificación de URLs",
      description: "Siempre verifica URLs antes de hacer clic, especialmente en correos sospechosos.",
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    },
    {
      icon: "🔒",
      title: "Certificados SSL",
      description: "Busca el candado verde y verifica que el certificado SSL sea válido.",
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    },
    {
      icon: "⚠️",
      title: "Dominios Sospechosos",
      description: "Desconfía de dominios que se parecen a marcas famosas con variaciones mínimas.",
      color: "from-red-500/20 to-pink-500/20 border-red-500/30",
    },
  ]

  const modelInfo = [
    { label: "Tipo de Modelo", value: "LightGBM + Random Forest" },
    { label: "Dataset", value: "450,176 URLs etiquetadas" },
    { label: "Características", value: "19 características extraídas" },
    { label: "Actualización", value: "Trimestral con nuevos datos" },
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
            Documentación y Recursos
          </motion.h1>
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Aprende sobre las características de CyberSentinel, API y mejores prácticas de seguridad
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* API Documentation */}
            <motion.div
              variants={itemVariants}
              className="glass-card border border-cyan-500/30 p-8"
              whileHover={{ y: -5 }}
            >
              <motion.h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">🔌</span>
                API REST - Análisis de URLs
              </motion.h2>

              <div className="space-y-6">
                {/* Endpoint */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="font-semibold text-cyan-400 mb-3 text-lg">POST Endpoint</h3>
                  <motion.div
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 font-mono text-sm text-cyan-300 overflow-x-auto"
                    whileHover={{ borderColor: "rgba(0, 217, 255, 0.5)" }}
                  >
                    https://cybersentinel-csdr.onrender.com/analyze
                  </motion.div>
                </motion.div>

                {/* Request */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <h3 className="font-semibold text-purple-400 mb-3 text-lg">Request Body</h3>
                  <motion.div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                    <pre>{`{
  "url": "https://ejemplo.com"
}`}</pre>
                  </motion.div>
                </motion.div>

                {/* Response */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h3 className="font-semibold text-green-400 mb-3 text-lg">Response</h3>
                  <motion.div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-64">
                    <pre>{apiExample}</pre>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Best Practices */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🛡️</span>
                Mejores Prácticas de Seguridad
              </h2>

              <motion.div className="grid gap-4" variants={containerVariants}>
                {bestPractices.map((practice, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`glass-card border bg-gradient-to-r ${practice.color} p-6`}
                    whileHover={{ x: 5, y: -5 }}
                  >
                    <div className="flex gap-4">
                      <motion.span
                        className="text-3xl flex-shrink-0"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {practice.icon}
                      </motion.span>
                      <div>
                        <h3 className="font-bold text-white mb-1">{practice.title}</h3>
                        <p className="text-slate-300 text-sm">{practice.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Model Info */}
            <motion.div
              variants={itemVariants}
              className="glass-card border border-cyan-500/30 p-6"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                <span>🤖</span>
                Acerca del Modelo IA
              </h3>
              <div className="space-y-3">
                {modelInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="pb-3 border-b border-slate-700/30"
                  >
                    <p className="text-cyan-400 font-semibold text-sm">{info.label}</p>
                    <p className="text-slate-300 text-xs mt-1">{info.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Browser Extension */}
            <motion.div
              variants={itemVariants}
              className="glass-card border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                <span>🧩</span>
                Extensión Navegador
              </h3>
              <p className="text-slate-400 text-sm mb-4">Protégete en tiempo real con nuestra extensión oficial.</p>
              <div className="space-y-2">
                <motion.a
                  href="/extension"
                  className="btn-glow w-full text-center text-sm py-2 block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Extensión
                </motion.a>
                <motion.a
                  href="https://github.com/Dxnn017/CyberSentinel-Extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full text-center text-sm py-2 block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver en GitHub
                </motion.a>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              variants={itemVariants}
              className="glass-card border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6"
              whileHover={{ y: -5 }}
            >
              <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                <span>💬</span>
                Soporte
              </h3>
              <p className="text-slate-300 text-sm mb-4">¿Preguntas? Contacta con nuestro equipo de soporte.</p>
              <motion.a
                href="/support"
                className="btn-glow w-full text-sm py-2 block text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Abrir Ticket de Soporte
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
