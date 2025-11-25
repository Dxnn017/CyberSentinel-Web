"use client"

import { Card } from "@/components/ui/card"
import { Code, Copy } from "lucide-react"
import { useState } from "react"

export function APIDocumentation() {
  const [copied, setCopied] = useState(false)

  const apiExample = `const response = await fetch('https://cybersentinel-csdr.onrender.com/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
});

const result = await response.json();
// Returns: { is_phishing, confidence, risk_score, risk_level, features }`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-slate-900 border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-sm uppercase flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          API Documentation
        </h3>
      </div>

      <div className="bg-slate-950 rounded border border-slate-700 p-4 font-mono text-xs text-green-400 overflow-x-auto mb-3">
        <pre>{apiExample}</pre>
      </div>

      <button
        onClick={copyToClipboard}
        className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded flex items-center justify-center gap-2 transition-colors"
      >
        <Copy className="w-4 h-4" />
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </Card>
  )
}
