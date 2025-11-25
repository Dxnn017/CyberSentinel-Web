"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database } from "lucide-react"

export function ModelInfo() {
  return (
    <Card className="bg-slate-900 border-slate-700 p-6">
      <h3 className="font-semibold text-white text-sm uppercase mb-4">ML Model Information</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Model Type</p>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-cyan-600 text-white">LightGBM</Badge>
            <Badge className="bg-blue-600 text-white">Random Forest</Badge>
            <Badge className="bg-purple-600 text-white">Decision Tree</Badge>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Performance</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Accuracy</span>
              <span className="font-semibold text-green-400">99.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Precision</span>
              <span className="font-semibold text-green-400">99.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Recall</span>
              <span className="font-semibold text-green-400">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">F1-Score</span>
              <span className="font-semibold text-green-400">99.6%</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Training Data
          </p>
          <p className="text-sm text-slate-300">
            450,176 URLs analyzed • Updated quarterly • Cross-validated with 10-fold CV
          </p>
        </div>
      </div>
    </Card>
  )
}
