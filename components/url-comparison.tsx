"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

interface URLComparisonProps {
  suspiciousURL: string
  legitimateURL: string
}

export function URLComparison({ suspiciousURL, legitimateURL }: URLComparisonProps) {
  const parse = (url: string) => {
    try {
      const urlObj = new URL(url)
      return {
        protocol: urlObj.protocol,
        domain: urlObj.hostname,
        path: urlObj.pathname,
        full: url,
      }
    } catch {
      return null
    }
  }

  const sus = parse(suspiciousURL)
  const leg = parse(legitimateURL)

  if (!sus || !leg) return null

  const domainMatch = sus.domain === leg.domain
  const protocolMatch = sus.protocol === leg.protocol

  return (
    <Card className="bg-slate-900 border-slate-700 p-4 mt-4">
      <h4 className="text-sm font-semibold text-white uppercase mb-3">URL Comparison</h4>

      <div className="space-y-3">
        {/* Domain Check */}
        <div className="flex items-start gap-3 p-3 bg-slate-800 rounded">
          <div className="flex-shrink-0 mt-0.5">
            {domainMatch ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="flex-1 text-xs">
            <p className="font-mono text-slate-300">Domain: {sus.domain}</p>
            <p className="text-slate-500 mt-1">
              {domainMatch ? "Matches legitimate site" : "Different from legitimate domain"}
            </p>
          </div>
        </div>

        {/* Protocol Check */}
        <div className="flex items-start gap-3 p-3 bg-slate-800 rounded">
          <div className="flex-shrink-0 mt-0.5">
            {protocolMatch ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <div className="flex-1 text-xs">
            <p className="font-mono text-slate-300">Protocol: {sus.protocol}</p>
            <p className="text-slate-500 mt-1">{protocolMatch ? "Uses secure connection" : "Insecure connection"}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
