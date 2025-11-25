"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface URLShortenerDemoProps {
  url: string
  prediction: "phishing" | "legitimate"
}

export function URLShortenerDemo({ url, prediction }: URLShortenerDemoProps) {
  const [expanded, setExpanded] = useState(false)

  const shortUrl = `${url.substring(0, 20)}...`
  const isSuspicious = prediction === "phishing"

  return (
    <Card
      className={`p-4 border-l-4 mt-4 ${
        isSuspicious
          ? "bg-red-950 border-l-red-500 hover:bg-red-900"
          : "bg-green-950 border-l-green-500 hover:bg-green-900"
      }`}
    >
      <div className="flex items-center gap-3">
        {isSuspicious && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 uppercase font-semibold">Full URL</p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-cyan-400 hover:text-cyan-300 font-mono truncate w-full text-left mt-1 flex items-center gap-2"
          >
            {expanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {expanded ? url : shortUrl}
          </button>
        </div>
      </div>
    </Card>
  )
}
