"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FeatureDetailsProps {
  features: any
}

export function FeatureDetails({ features }: FeatureDetailsProps) {
  const [expanded, setExpanded] = useState(false)

  if (!features) return null

  const featureGroups = {
    "URL Structure": [
      { label: "URL Length", value: features.url_length },
      { label: "Domain Length", value: features.domain_length },
      { label: "Subdomain Count", value: features.subdomain_count },
      { label: "Path Length", value: features.path_length },
    ],
    "Suspicious Indicators": [
      { label: "Has @ Symbol", value: features.at_symbol ? "Yes" : "No" },
      { label: "Has IP Address", value: features.has_ip ? "Yes" : "No" },
      { label: "Hyphen Count", value: features.hyphen_count },
      { label: "Special Characters", value: features.special_chars },
    ],
    "Security Features": [
      { label: "HTTPS Protocol", value: features.https ? "Yes" : "No" },
      { label: "Port Present", value: features.port_present ? "Yes" : "No" },
      { label: "Suspicious Words", value: features.suspicious_words },
      { label: "Risk Score", value: features.risk_score },
    ],
    "Text Analysis": [
      { label: "Entropy", value: features.entropy.toFixed(2) },
      { label: "Digit Ratio", value: `${features.digit_ratio.toFixed(1)}%` },
      { label: "Vowel Ratio", value: `${features.vowel_ratio.toFixed(1)}%` },
      { label: "TLD Length", value: features.tld_length },
    ],
  }

  return (
    <Card className="bg-slate-900 border-slate-700 mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-800 transition-colors"
      >
        <h3 className="text-sm font-semibold text-white uppercase">Detailed Analysis Features</h3>
        {expanded ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-cyan-400" />}
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-700 space-y-6">
          {Object.entries(featureGroups).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase text-cyan-400 mb-3">{group}</h4>
              <div className="grid grid-cols-2 gap-3">
                {items.map((item, idx) => (
                  <div key={idx} className="bg-slate-800 rounded p-3 border border-slate-700">
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
