"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Analizador", icon: "🔍" },
    { href: "/dashboard", label: "Panel", icon: "📊" },
    { href: "/documentation", label: "Documentación", icon: "📚" },
  ]

  return (
    <motion.nav
      className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur sticky top-0 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 font-bold text-base sm:text-lg hover:opacity-80 transition-opacity group"
            >
              <motion.div
                className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-white text-lg sm:text-xl">🛡️</span>
              </motion.div>
              <motion.span className="gradient-text bg-clip-text text-sm sm:text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                CyberSentinel
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex gap-1 sm:gap-2">
            {links.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <motion.span
                      className="text-base sm:text-lg"
                      animate={{ rotate: isActive ? 360 : 0 }}
                      transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {link.icon}
                    </motion.span>
                    <span className="hidden xs:inline sm:inline">{link.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
