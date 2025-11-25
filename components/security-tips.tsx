"use client"

import { motion } from "framer-motion"

export function SecurityTips() {
  const tips = [
    {
      icon: "👁️",
      title: "Verifica URLs",
      description: "Siempre revisa la URL completa antes de ingresar datos sensibles",
      color: "blue",
    },
    {
      icon: "🔒",
      title: "Usa HTTPS",
      description: "Ingresa datos solo en sitios con certificados SSL válidos",
      color: "green",
    },
    {
      icon: "🛡️",
      title: "Autenticación 2FA",
      description: "Activa 2FA en cuentas importantes para mayor protección",
      color: "purple",
    },
    {
      icon: "⚠️",
      title: "Reporta Phishing",
      description: "Reporta correos sospechosos a las autoridades pertinentes",
      color: "red",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-500/60",
    green: "from-green-500/20 to-green-600/20 border-green-500/30 hover:border-green-500/60",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-500/60",
    red: "from-red-500/20 to-red-600/20 border-red-500/30 hover:border-red-500/60",
  }

  return (
    <motion.div
      className="glass-card border border-cyan-500/30 p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.h3
        className="font-bold text-white text-lg mb-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-2xl">💡</span>
        Consejos de Seguridad
      </motion.h3>
      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
        {tips.map((tip, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ x: 5, scale: 1.02 }}
            className={`glass-card border p-4 bg-gradient-to-r ${colorClasses[tip.color as keyof typeof colorClasses]} transition-all`}
          >
            <div className="flex gap-3 items-start">
              <motion.span
                className="text-2xl flex-shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {tip.icon}
              </motion.span>
              <div>
                <p className="text-sm font-bold text-white">{tip.title}</p>
                <p className="text-xs text-slate-300 mt-1">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
