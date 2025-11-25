"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  const features = [
    { icon: "🔐", label: "Detección IA", value: "99.5% Precisión" },
    { icon: "⚡", label: "Tiempo Real", value: "<2s Respuesta" },
    { icon: "🛡️", label: "Seguro", value: "HTTPS Validado" },
    { icon: "📊", label: "Análisis", value: "Rastreo Completo" },
  ]

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

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Orbes animadas 3D */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <motion.div
            className="inline-block px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              🛡️ Seguridad de Próxima Generación
            </span>
          </motion.div>
        </motion.div>

        {/* Títulos */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text block">Detecta Phishing</span>
            <motion.span
              className="text-white block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Con Inteligencia Artificial
            </motion.span>
          </h1>

          <motion.p variants={itemVariants} className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            CyberSentinel utiliza aprendizaje automático avanzado para analizar URLs y protegerte de sitios fraudulentos
            en tiempo real. Mantente seguro.
          </motion.p>
        </motion.div>

        {/* Botones */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap mb-20">
          <motion.button
            className="btn-glow"
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 217, 255, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar Análisis
          </motion.button>
          <motion.button className="btn-ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Más Información
          </motion.button>
        </motion.div>

        {/* Grid de Características */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={containerVariants}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)",
              }}
              className="glass-card p-6 text-center cursor-pointer group"
            >
              <motion.p
                className="text-4xl mb-3 group-hover:scale-110 transition-transform"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {feature.icon}
              </motion.p>
              <p className="text-sm text-slate-400 mb-1 font-medium">{feature.label}</p>
              <p className="text-lg font-bold text-white">{feature.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
