"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simular envío de email (en producción usarías un servicio como SendGrid, Resend, etc.)
    try {
      // Por ahora, solo mostramos un mensaje de éxito
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-6xl">💬</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Centro de Soporte</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              ¿Necesitas ayuda? Estamos aquí para asistirte. Envíanos tus preguntas o reporta algún problema.
            </p>
          </div>

          {/* Support Form */}
          <motion.div
            className="glass-card p-8 border-2 border-purple-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-glow w-full"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-glow w-full"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-glow w-full"
                >
                  <option value="">Selecciona un tipo de consulta</option>
                  <option value="bug">Reporte de Bug</option>
                  <option value="feature">Solicitud de Funcionalidad</option>
                  <option value="help">Ayuda Técnica</option>
                  <option value="false-positive">Falso Positivo</option>
                  <option value="api">Consulta sobre API</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-glow w-full resize-none"
                  placeholder="Describe tu consulta o problema en detalle..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border-l-4 border-l-green-500 bg-green-500/10 border border-green-500/30"
                >
                  <p className="text-green-300 text-sm">
                    ✅ ¡Mensaje enviado! Te responderemos pronto a tu email.
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border-l-4 border-l-red-500 bg-red-500/10 border border-red-500/30"
                >
                  <p className="text-red-300 text-sm">
                    ❌ Error al enviar. Por favor, intenta de nuevo.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="btn-glow w-full py-3"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      ⚙️
                    </motion.span>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Help */}
          <motion.div
            className="mt-8 grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card p-4 text-center">
              <span className="text-2xl mb-2 block">📚</span>
              <h3 className="font-semibold text-white mb-1">Documentación</h3>
              <p className="text-sm text-slate-400 mb-2">Consulta nuestra guía completa</p>
              <a href="/documentation" className="text-cyan-400 text-sm hover:underline">
                Ver Docs →
              </a>
            </div>

            <div className="glass-card p-4 text-center">
              <span className="text-2xl mb-2 block">💻</span>
              <h3 className="font-semibold text-white mb-1">GitHub</h3>
              <p className="text-sm text-slate-400 mb-2">Reporta issues en GitHub</p>
              <a
                href="https://github.com/Dxnn017/CyberSentinel-Web/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-sm hover:underline"
              >
                Abrir Issue →
              </a>
            </div>

            <div className="glass-card p-4 text-center">
              <span className="text-2xl mb-2 block">📧</span>
              <h3 className="font-semibold text-white mb-1">Email Directo</h3>
              <p className="text-sm text-slate-400 mb-2">Contacto urgente</p>
              <a href="mailto:support@cybersentinel.com" className="text-cyan-400 text-sm hover:underline">
                support@cybersentinel.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
